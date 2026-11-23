package za.co.butterflies.app

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import org.json.JSONArray
import org.json.JSONObject
import za.co.butterflies.shared.School
import java.net.HttpURLConnection
import java.net.URL
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

class SessionStore(context: Context) {
    private val prefs = context.getSharedPreferences("school_session", Context.MODE_PRIVATE)
    private fun key(): SecretKey {
        val ks = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
        (ks.getKey("butterflies-session", null) as? SecretKey)?.let { return it }
        return KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES,"AndroidKeyStore").apply {
            init(KeyGenParameterSpec.Builder("butterflies-session",KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE).build())
        }.generateKey()
    }
    fun save(session: JSONObject) {
        val cipher = Cipher.getInstance("AES/GCM/NoPadding").apply { init(Cipher.ENCRYPT_MODE,key()) }
        val bytes = cipher.iv + cipher.doFinal(session.toString().toByteArray(Charsets.UTF_8))
        check(prefs.edit().putString("encrypted", Base64.encodeToString(bytes,Base64.NO_WRAP)).commit()) { "Could not securely save sign-in. Please try again." }
    }
    fun load(): JSONObject? = runCatching {
        val bytes = Base64.decode(prefs.getString("encrypted",null) ?: return null,Base64.NO_WRAP)
        val cipher = Cipher.getInstance("AES/GCM/NoPadding").apply { init(Cipher.DECRYPT_MODE,key(),GCMParameterSpec(128,bytes.copyOfRange(0,12))) }
        JSONObject(String(cipher.doFinal(bytes.copyOfRange(12,bytes.size)),Charsets.UTF_8))
    }.getOrNull()
    fun clear() { prefs.edit().clear().commit() }
}

class SchoolApi(private val store: SessionStore) {
    var session: JSONObject? = store.load(); private set
    val signedIn get() = session != null
    val uid get() = session?.optJSONObject("user")?.optString("id") ?: error("Please sign in first.")
    val email get() = session?.optJSONObject("user")?.optString("email").orEmpty()
    private fun request(path: String, method: String="GET", body: JSONObject?=null, token: String?=null, prefer: String="return=representation"): String {
        require(path.startsWith("/auth/v1/") || path.startsWith("/rest/v1/"))
        val c=URL(School.backend+path).openConnection() as HttpURLConnection
        try {
            c.requestMethod=method; c.connectTimeout=15000; c.readTimeout=20000; c.instanceFollowRedirects=false
            c.setRequestProperty("apikey",School.publicKey)
            if (!token.isNullOrBlank()) c.setRequestProperty("Authorization","Bearer $token")
            c.setRequestProperty("Accept","application/json"); c.setRequestProperty("Prefer",prefer)
            if(body!=null){ c.doOutput=true; c.setRequestProperty("Content-Type","application/json"); c.outputStream.use{it.write(body.toString().toByteArray(Charsets.UTF_8))} }
            val status=c.responseCode
            val result=(if(status in 200..299)c.inputStream else c.errorStream)?.bufferedReader()?.use{it.readText()}.orEmpty()
            if(status !in 200..299) {
                val e=runCatching{JSONObject(result)}.getOrNull()
                val msg=e?.optString("msg")?.takeIf{it.isNotBlank()} ?: e?.optString("message")?.takeIf{it.isNotBlank()} ?: e?.optString("error_description")?.takeIf{it.isNotBlank()}
                error(when(status){401,403 -> msg ?: "Sign in again or ask the school to check your access.";409 -> "This request already exists. Refresh to see its status.";else -> msg ?: "The school service could not complete this request (HTTP $status)."})
            }
            return result
        } finally { c.disconnect() }
    }
    @Synchronized private fun token(): String? {
        val s=session ?: return null
        if(s.optLong("expires_at") < System.currentTimeMillis()/1000+90) {
            try { accept(JSONObject(request("/auth/v1/token?grant_type=refresh_token","POST",JSONObject().put("refresh_token",s.getString("refresh_token"))))) }
            catch(e: Exception) { session=null;store.clear();throw IllegalStateException("Your session expired. Please sign in again.") }
        }
        return session?.getString("access_token")
    }
    private fun accept(s: JSONObject) {
        check(s.has("access_token")&&s.has("refresh_token")&&s.optJSONObject("user")!=null) { "Sign-in response was incomplete. Please try again." }
        if(!s.has("expires_at"))s.put("expires_at",System.currentTimeMillis()/1000+s.optLong("expires_in",3600))
        store.save(s);session=s
    }
    fun login(email: String,password: String) = accept(JSONObject(request("/auth/v1/token?grant_type=password","POST",JSONObject().put("email",School.requireEmail(email)).put("password",password))))
    fun signup(email: String,password: String,name: String) {
        val r=JSONObject(request("/auth/v1/signup?redirect_to="+java.net.URLEncoder.encode(School.website+"parent.html","UTF-8"),"POST",JSONObject().put("email",School.requireEmail(email)).put("password",School.requirePassword(password)).put("data",JSONObject().put("full_name",School.requireName(name)))))
        if(r.has("access_token"))accept(r)
    }
    fun reset(email: String) { request("/auth/v1/recover?redirect_to="+java.net.URLEncoder.encode(School.website+"parent.html","UTF-8"),"POST",JSONObject().put("email",School.requireEmail(email))) }
    fun logout() { val t=session?.optString("access_token");session=null;store.clear();runCatching { request("/auth/v1/logout?scope=local","POST",JSONObject(),t) } }
    fun list(query: String): JSONArray = JSONArray(request("/rest/v1/$query",token=token()).ifBlank{"[]"})
    fun write(table: String,body: JSONObject,filter: String?=null): JSONArray = JSONArray(request("/rest/v1/$table"+(filter?.let{"?$it"}?:""),if(filter==null)"POST" else "PATCH",body,token()).ifBlank{"[]"})
    fun upsert(table: String,body: JSONObject,on: String) = JSONArray(request("/rest/v1/$table?on_conflict=$on","POST",body,token(),"resolution=merge-duplicates,return=representation").ifBlank{"[]"})
    fun rpc(name: String,body: JSONObject): String = request("/rest/v1/rpc/$name","POST",body,token())
}
fun JSONArray.rows(): List<JSONObject> = (0 until length()).map { getJSONObject(it) }
