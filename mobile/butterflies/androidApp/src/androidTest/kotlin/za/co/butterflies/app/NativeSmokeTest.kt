package za.co.butterflies.app
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.webkit.WebView
import androidx.test.core.app.ActivityScenario
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Test
import org.junit.Assert.*
import org.junit.runner.RunWith
import org.json.JSONObject

@RunWith(AndroidJUnit4::class)
class NativeSmokeTest {
    private fun views(v: View): List<View> = listOf(v)+(if(v is ViewGroup)(0 until v.childCount).flatMap{views(v.getChildAt(it))}else emptyList())
    @Test fun homeAndSignInAreNativeAndStayInsideApp() {
        ActivityScenario.launch(MainActivity::class.java).use { scenario->
            scenario.onActivity { activity->
                val all=views(activity.window.decorView)
                assertFalse(all.any{it is WebView})
                assertTrue(all.filterIsInstance<TextView>().any{it.text.toString()=="Butterflies Educare"})
                all.filterIsInstance<Button>().first{it.text=="Sign in with my school account"}.performClick()
                val login=views(activity.window.decorView)
                assertTrue(login.filterIsInstance<TextView>().any{it.text.toString()=="Welcome back"})
                assertFalse(login.any{it is WebView})
                assertTrue(login.filterIsInstance<Button>().any{it.text=="Reset password"})
            }
        }
    }
    @Test fun sessionStorageRoundTripsButNeverStoresPlainTokens() {
        val c=InstrumentationRegistry.getInstrumentation().targetContext
        val store=SessionStore(c)
        try {
            val fixture=JSONObject().put("access_token","synthetic-test-value").put("refresh_token","synthetic-refresh")
            store.save(fixture)
            assertEquals("synthetic-test-value",store.load()!!.getString("access_token"))
            assertFalse(c.getSharedPreferences("school_session",0).all.toString().contains("synthetic-test-value"))
            store.clear();assertNull(store.load())
        } finally { store.clear() }
    }
}
