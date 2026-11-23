package za.co.butterflies.app

import android.animation.ValueAnimator
import android.os.Build
import android.app.Activity
import android.app.AlertDialog
import android.content.Intent
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.net.Uri
import android.os.Bundle
import android.text.InputType
import android.view.Gravity
import android.view.View
import android.view.WindowManager
import android.widget.*
import org.json.JSONObject
import za.co.butterflies.shared.School
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.util.concurrent.Executors

/** Native Android widgets; no WebView, browser wrapper or JavaScript bridge. */
class MainActivity: Activity() {
    private lateinit var api: SchoolApi
    private lateinit var content: LinearLayout
    private lateinit var feedback: TextView
    private val executor=Executors.newSingleThreadExecutor()
    private var revision=0
    private val taskRevision=ThreadLocal<Int>()
    private var staffRole=""
    private var profile: JSONObject?=null
    private var screen="home"
    private val green=Color.rgb(31,78,59)
    private val muted=Color.rgb(78,105,91)
    private val cream=Color.rgb(249,245,236)
    override fun onCreate(savedInstanceState: Bundle?) {
        setTheme(R.style.SchoolTheme)
        super.onCreate(savedInstanceState)
        window.setFlags(WindowManager.LayoutParams.FLAG_SECURE,WindowManager.LayoutParams.FLAG_SECURE)
        if(Build.VERSION.SDK_INT>=31) splashScreen.setOnExitAnimationListener { splash ->
            if(ValueAnimator.areAnimatorsEnabled()) splash.animate().alpha(0f).setDuration(180).withEndAction { splash.remove() }.start() else splash.remove()
        }
        api=SchoolApi(SessionStore(this));home()
    }
    override fun onDestroy(){super.onDestroy();executor.shutdownNow()}
    private fun dp(n: Int)=(n*resources.displayMetrics.density).toInt()
    private fun text(value: String,size: Float=16f,color: Int=green,bold: Boolean=false,parent: LinearLayout=content): TextView = TextView(this).apply {
        text=value;textSize=size;setTextColor(color);setPadding(0,dp(6),0,dp(6));if(bold)setTypeface(null,Typeface.BOLD);parent.addView(this)
    }
    private fun card(title: String,body: String): LinearLayout {
        val box=LinearLayout(this).apply { orientation=LinearLayout.VERTICAL;setPadding(dp(20),dp(16),dp(20),dp(16));background=GradientDrawable().apply{setColor(Color.WHITE);cornerRadius=dp(20).toFloat();setStroke(dp(1),Color.rgb(218,229,218))} }
        content.addView(box,LinearLayout.LayoutParams(-1,-2).apply{bottomMargin=dp(14)})
        text(title,21f,bold=true,parent=box);if(body.isNotBlank())text(body,16f,muted,parent=box);return box
    }
    private fun action(label: String,parent: LinearLayout=content,callback:()->Unit): Button = Button(this).apply {
        text=label;isAllCaps=false;textSize=16f;setTextColor(Color.WHITE);minHeight=dp(52)
        background=pressSurface(green,16)
        parent.addView(this,LinearLayout.LayoutParams(-1,-2).apply{topMargin=dp(6);bottomMargin=dp(6)})
        setOnClickListener{callback()}
    }
    private fun input(label: String,value: String="",password: Boolean=false,multiline: Boolean=false): EditText {
        text(label,15f,bold=true)
        return EditText(this).apply {
            setText(value);textSize=17f;setTextColor(green);minHeight=dp(52);setPadding(dp(10),dp(8),dp(10),dp(8));background=shape(Color.WHITE,14)
            inputType=when{password->InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD;multiline->InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_FLAG_MULTI_LINE;label.contains("email",true)->InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS;else->InputType.TYPE_CLASS_TEXT}
            if(multiline)minLines=3
            contentDescription=label
            isSaveEnabled=false
            content.addView(this,LinearLayout.LayoutParams(-1,-2).apply{bottomMargin=dp(10)})
        }
    }
    private fun check(label: String)=CheckBox(this).apply {text=label;textSize=16f;setTextColor(green);content.addView(this)}
    private fun shape(color: Int,radius: Int=20)=GradientDrawable().apply {setColor(color);cornerRadius=dp(radius).toFloat()}
    private fun pressSurface(color: Int,radius: Int=20)=android.graphics.drawable.RippleDrawable(android.content.res.ColorStateList.valueOf(if(color==green)0x33FFFFFF else 0x14244B3D),shape(color,radius),shape(Color.WHITE,radius))
    private fun selectedTab(key: String)=when(key){"classes"->"classes";"events"->"events";"messages"->"inbox";"profile","children","child-form","requests","account","auth","staff","policies"->"account";else->"home"}
    private fun tabBar(key: String): LinearLayout {
        val selected=selectedTab(key)
        val bar=LinearLayout(this).apply {orientation=LinearLayout.HORIZONTAL;setPadding(dp(6),dp(7),dp(6),dp(7));setBackgroundColor(Color.WHITE);elevation=dp(7).toFloat();tag="main-navigation"}
        for((id,label) in listOf("home" to "Home","classes" to "Classes","events" to "Events","inbox" to "Inbox","account" to "Account")) {
            val active=id==selected
            val tab=LinearLayout(this).apply {orientation=LinearLayout.VERTICAL;gravity=Gravity.CENTER;minimumHeight=dp(62);isClickable=true;isFocusable=true;contentDescription="$label"+(if(active)", selected"else"");tag="tab-$id";isSelected=active;background=pressSurface(if(active)Color.rgb(231,240,232) else Color.WHITE,16)}
            tab.addView(SchoolIcon(this,id,if(active)green else muted),LinearLayout.LayoutParams(dp(23),dp(23)))
            TextView(this).apply {text=label;textSize=11f;setTextColor(if(active)green else muted);gravity=Gravity.CENTER;setPadding(0,dp(4),0,0);if(active)setTypeface(null,Typeface.BOLD);tab.addView(this)}
            bar.addView(tab,LinearLayout.LayoutParams(0,-2,1f))
            tab.setOnClickListener {if(active&&screen==id)return@setOnClickListener;when(id){"home"->home();"classes"->classesScreen();"events"->eventsScreen();"inbox"->if(api.signedIn)messagesScreen()else auth();else->accountScreen()}}
        }
        return bar
    }
    private fun page(title: String,key: String="home") {
        revision++;screen=key
        val root=LinearLayout(this).apply{orientation=LinearLayout.VERTICAL;setBackgroundColor(cream)}
        val header=LinearLayout(this).apply{orientation=LinearLayout.HORIZONTAL;gravity=Gravity.CENTER_VERTICAL;setPadding(dp(16),dp(8),dp(16),dp(8))}
        if(key !in listOf("home","classes","events","messages","account")) {
            val back=ImageButton(this).apply {setImageResource(android.R.drawable.ic_media_previous);imageTintList=android.content.res.ColorStateList.valueOf(green);contentDescription="Back";background=shape(Color.WHITE,14);setOnClickListener{this@MainActivity.back()}}
            header.addView(back,LinearLayout.LayoutParams(dp(48),dp(48)).apply{marginEnd=dp(8)})
        } else header.addView(ImageView(this).apply{setImageResource(R.drawable.butterfly);importantForAccessibility=View.IMPORTANT_FOR_ACCESSIBILITY_NO},LinearLayout.LayoutParams(dp(38),dp(38)))
        val brand=TextView(this).apply{text="Butterflies Educare";textSize=18f;setTextColor(green);setTypeface(null,Typeface.BOLD);setPadding(dp(8),0,0,0)};header.addView(brand,LinearLayout.LayoutParams(0,-2,1f));root.addView(header)
        val scroll=ScrollView(this).apply{isFillViewport=true;clipToPadding=false};content=LinearLayout(this).apply{orientation=LinearLayout.VERTICAL;setPadding(dp(20),dp(8),dp(20),dp(24))};scroll.addView(content);root.addView(scroll,LinearLayout.LayoutParams(-1,0,1f))
        text(title,28f,bold=true)
        feedback=text("",15f,muted).apply{visibility=View.GONE;accessibilityLiveRegion=View.ACCESSIBILITY_LIVE_REGION_POLITE}
        root.addView(tabBar(key))
        setContentView(root)
        root.setOnApplyWindowInsetsListener { v,insets->v.setPadding(insets.systemWindowInsetLeft,insets.systemWindowInsetTop,insets.systemWindowInsetRight,insets.systemWindowInsetBottom);insets }
    }
    private fun shortcut(parent: LinearLayout,icon: String,title: String,detail: String,callback:()->Unit) {
        val tile=LinearLayout(this).apply {orientation=LinearLayout.VERTICAL;setPadding(dp(16),dp(18),dp(16),dp(18));background=pressSurface(Color.WHITE);minimumHeight=dp(150);isClickable=true;isFocusable=true;contentDescription="$title. $detail"}
        tile.addView(SchoolIcon(this,icon,green),LinearLayout.LayoutParams(dp(28),dp(28)))
        text(title,18f,bold=true,parent=tile);text(detail,13f,muted,parent=tile)
        parent.addView(tile,LinearLayout.LayoutParams(0,-1,1f).apply{marginStart=dp(4);marginEnd=dp(4)})
        tile.setOnClickListener{callback()}
    }
    private fun shortcutRow(left: (LinearLayout)->Unit,right: (LinearLayout)->Unit) {
        val row=LinearLayout(this).apply{orientation=LinearLayout.HORIZONTAL;isBaselineAligned=false};content.addView(row,LinearLayout.LayoutParams(-1,-2).apply{bottomMargin=dp(12)});left(row);right(row)
    }
    private fun menuRow(icon: String,title: String,detail: String,callback:()->Unit) {
        val row=LinearLayout(this).apply {orientation=LinearLayout.HORIZONTAL;gravity=Gravity.CENTER_VERTICAL;setPadding(dp(16),dp(12),dp(12),dp(12));background=pressSurface(Color.WHITE,18);minimumHeight=dp(76);isClickable=true;isFocusable=true;contentDescription="$title. $detail"}
        row.addView(SchoolIcon(this,icon,green),LinearLayout.LayoutParams(dp(26),dp(26)))
        val words=LinearLayout(this).apply{orientation=LinearLayout.VERTICAL;setPadding(dp(14),0,dp(8),0)};row.addView(words,LinearLayout.LayoutParams(0,-2,1f));text(title,17f,bold=true,parent=words);if(detail.isNotBlank())text(detail,13f,muted,parent=words)
        text("›",26f,parent=row);content.addView(row,LinearLayout.LayoutParams(-1,-2).apply{bottomMargin=dp(10)});row.setOnClickListener{callback()}
    }
    private fun notice(value: String) {feedback.text=value;feedback.visibility=if(value.isBlank())View.GONE else View.VISIBLE}
    private fun task(work:()->Unit) {
        val stamp=revision;notice("Connecting to your school…");content.isEnabled=false
        // Disable all buttons while a mutation runs; re-enable only on the same screen.
        fun enable(v: View,on: Boolean){v.isEnabled=on;if(v is android.view.ViewGroup)for(i in 0 until v.childCount)enable(v.getChildAt(i),on)}
        enable(content,false)
        executor.execute {taskRevision.set(stamp);try{work()}catch(e:Exception){ui(stamp){notice(if(e is java.io.IOException)"Could not connect. Check your internet connection and try again. Nothing has been confirmed as saved." else e.message?:"Could not complete the request.")}}finally{ui(stamp){enable(content,true);if(feedback.text=="Connecting to your school…")notice("")};taskRevision.remove()}}
    }
    private fun ui(stamp: Int=taskRevision.get()?:revision,fn:()->Unit){runOnUiThread{if(!isFinishing&&!isDestroyed&&stamp==revision)fn()}}
    private fun web(path: String) {startActivity(Intent(Intent.ACTION_VIEW,Uri.parse(School.safeWebPath(path))))}
    private fun needProfile() {check(profile?.optString("privacy_consent_at").orEmpty().let{it.isNotBlank()&&it!="null"}){"Save your contact profile and privacy acknowledgement first."}}
    private fun formatTime(value: String)=runCatching{OffsetDateTime.parse(value).withOffsetSameInstant(ZoneOffset.ofHours(2)).format(DateTimeFormatter.ofPattern("d MMM yyyy, HH:mm"))+" SAST"}.getOrDefault(value)
    private fun home() {
        page(if(api.signedIn)"Hello, "+(profile?.optString("display_name")?.substringBefore(" ")?.takeIf{it.isNotBlank()}?:"welcome back") else "Your school, close by.")
        val hero=LinearLayout(this).apply {orientation=LinearLayout.HORIZONTAL;gravity=Gravity.CENTER_VERTICAL;setPadding(dp(20),dp(18),dp(12),dp(18));background=GradientDrawable(GradientDrawable.Orientation.TL_BR,intArrayOf(Color.rgb(225,237,222),Color.rgb(244,235,215))).apply{cornerRadius=dp(24).toFloat()}}
        val words=LinearLayout(this).apply{orientation=LinearLayout.VERTICAL};hero.addView(words,LinearLayout.LayoutParams(0,-2,1f));text("GROWING TOGETHER",11f,muted,true,words);text(if(api.signedIn)"A little place.\nA big community."else"Welcome to\nyour school.",26f,bold=true,parent=words).setTypeface(Typeface.create("serif",Typeface.NORMAL));text("School life, in your pocket.",14f,muted,parent=words)
        hero.addView(ImageView(this).apply{setImageResource(R.drawable.butterfly);importantForAccessibility=View.IMPORTANT_FOR_ACCESSIBILITY_NO},LinearLayout.LayoutParams(dp(90),dp(90)));content.addView(hero,LinearLayout.LayoutParams(-1,-2).apply{topMargin=dp(10);bottomMargin=dp(18)})
        if(ValueAnimator.areAnimatorsEnabled()){hero.alpha=0f;hero.translationY=dp(8).toFloat();hero.animate().alpha(1f).translationY(0f).setDuration(240).start()}
        if(!api.signedIn){action("Sign in with my school account"){auth()};text("One account for the app and website.",14f,muted);menuRow("account","Create an account","Join your school community"){auth(true)}}
        else {text("For your family",20f,bold=true);shortcutRow({shortcut(it,"children","My children","Profiles & school details"){childrenScreen()}},{shortcut(it,"requests","My requests","Places & applications"){requestsScreen()}})}
        text("Around school",20f,bold=true)
        shortcutRow({shortcut(it,"classes","Classes","Find something to learn"){classesScreen()}},{shortcut(it,"events","Events","Join school activities"){eventsScreen()}})
        menuRow("news","School news","Updates from Butterflies"){newsScreen()}
        menuRow("offer","Offer a class","Share your skills with our community"){if(api.signedIn)providerScreen()else auth()}
        if(api.signedIn){val stamp=revision;task{val p=api.list("be_parent_profiles?select=*&user_id=eq.${api.uid}").rows().firstOrNull();val role=api.list("be_staff_memberships?select=staff_role&user_id=eq.${api.uid}").rows().firstOrNull()?.optString("staff_role").orEmpty();ui(stamp){profile=p;staffRole=role;if(role in listOf("admin","staff"))menuRow("news","School team","Your school overview"){staffScreen()};if(p==null)notice("Welcome! Complete your profile in Account to send requests.")}}}
    }
    private fun accountScreen() {
        page("My account","account")
        if(!api.signedIn){card("Your own school space","Sign in to manage your profile, children and requests.");action("Sign in with my school account"){auth()};action("Create an account"){auth(true)}}
        else {
            card(profile?.optString("display_name")?.takeIf{it.isNotBlank()}?:"Your school account",api.email)
            menuRow("account","My profile","Your name and contact details"){profileScreen()}
            menuRow("children","My children","Manage child profiles"){childrenScreen()}
            menuRow("requests","Requests & applications","Track school and class requests"){requestsScreen()}
            menuRow("inbox","School inbox","Your messages and school replies"){messagesScreen()}
            if(staffRole in listOf("admin","staff"))menuRow("news","School team","School overview and fundraising ideas"){staffScreen()}
            action("Sign out"){AlertDialog.Builder(this).setTitle("Sign out?").setMessage("You can return with the same email and password.").setNegativeButton("Stay signed in",null).setPositiveButton("Sign out"){_,_->task{api.logout();ui{profile=null;staffRole="";home()}}}.show()}
        }
        menuRow("news","School information","Fees, privacy and contact details"){policies()}
        text("Butterflies for Android · ${School.version} test",13f,muted)
    }
    private fun auth(signup: Boolean=false) {
        page(if(signup)"Join your school community" else "Welcome back","auth")
        text("Use the same email and password as the school website.",16f,muted)
        val name=if(signup)input("Your name")else null;val email=input("Email");val password=input("Password",password=true)
        val consent=if(signup)check("I agree to the school privacy notice and understand that staff access needs school approval.")else null
        action("Read privacy notice"){web("privacy.html")}
        action(if(signup)"Create account" else "Sign in") {
            val e=email.text.toString();val p=password.text.toString();val n=name?.text?.toString().orEmpty();val ok=consent?.isChecked?:true
            task {School.requireConsent(ok);if(signup){api.signup(e,p,n);ui{password.setText("");if(api.signedIn)home()else notice("Check your email and tap the confirmation link. Then return here and sign in. If the address is already registered, sign in or reset your password.")}}else{api.login(e,p);ui{password.setText("");home()}}}
        }
        if(signup)action("Already registered? Sign in"){auth()} else {action("Create account"){auth(true)};action("Reset password"){val e=email.text.toString();task{api.reset(e);ui{notice("If that address is registered, a password-reset link has been sent. Open the email to choose a password, then return to the app.")}}}}
    }
    private fun profileScreen() {
        page("My profile","profile");text("Your details are shared privately with authorised school staff.",16f,muted)
        val name=input("Your name",profile?.optString("display_name").orEmpty());val phone=input("Phone",profile?.optString("phone").orEmpty().replace("null",""))
        text("Account email: ${api.email}",16f,muted)
        val consent=check("I agree to share my contact profile with the school as described in the privacy notice.");consent.isChecked=profile?.optString("privacy_consent_at")?.let{it.isNotBlank()&&it!="null"}?:false
        action("Read privacy notice"){web("privacy.html")}
        action("Save profile") {val n=name.text.toString();val p=phone.text.toString();val ok=consent.isChecked;task{School.requireConsent(ok);val payload=JSONObject().put("user_id",api.uid).put("display_name",School.requireName(n)).put("phone",p).put("contact_email",api.email).put("preferred_contact","email").put("privacy_consent_at",profile?.optString("privacy_consent_at")?.takeIf{it!="null"&&it.isNotBlank()}?:java.time.Instant.now().toString());val saved=api.upsert("be_parent_profiles",payload,"user_id").rows().firstOrNull()?:error("The profile was not saved.");ui{profile=saved;notice("Your profile is saved to your school account.")}}}
    }
    private fun childrenScreen() {
        page("My children","children");text("A child profile does not confirm admission or a school place.",16f,muted)
        action("Add a child"){childForm()}
        val stamp=revision;task{val rows=api.list("be_family_children?select=id,display_name,birth_date,school_group&parent_id=eq.${api.uid}&order=created_at").rows();ui(stamp){if(rows.isEmpty())text("No child profiles yet.");for(c in rows){val box=card(c.optString("display_name"),"${c.optString("school_group")}\n${c.optString("birth_date").replace("null","")}");action("Edit profile",box){childForm(c)}}}}
    }
    private fun childForm(child: JSONObject?=null) {
        page(if(child==null)"Add child profile"else"Edit child profile","child-form")
        val name=input("Child’s name",child?.optString("display_name").orEmpty());val dob=input("Date of birth (optional): YYYY-MM-DD",child?.optString("birth_date").orEmpty().replace("null",""));val group=input("School class / group (optional)",child?.optString("school_group").orEmpty());val consent=check("I am authorised to manage this child’s details and share them privately with the school.")
        action("Save child profile"){val n=name.text.toString();val d=dob.text.toString().trim();val g=group.text.toString();val ok=consent.isChecked;task{needProfile();School.requireConsent(ok);if(d.isNotBlank())require(!LocalDate.parse(d).isAfter(LocalDate.now())&&LocalDate.parse(d).year>=2000){"Check the date of birth."};val body=JSONObject().put("parent_id",api.uid).put("display_name",School.requireName(n)).put("birth_date",if(d.isBlank())JSONObject.NULL else d).put("school_group",g);val saved=api.write("be_family_children",body,child?.let{"id=eq.${it.getString("id")}&parent_id=eq.${api.uid}"});check(saved.length()>0){"The child profile was not saved."};ui{childrenScreen()}}}
    }
    private fun classesScreen() {
        page("Find a class","classes");val stamp=revision;task{val rows=api.list("be_regular_classes?select=*&published=eq.true&order=title").rows();ui(stamp){if(rows.isEmpty())text("No published classes yet.");for(c in rows){val box=card(c.optString("title"),listOf(c.optString("description"),c.optString("age_range"),c.optString("schedule_note"),c.optString("fee_note")).filter{it.isNotBlank()}.joinToString("\n\n"));if(c.optBoolean("accepting_interest"))action("Request a place",box){if(!api.signedIn)auth() else chooseChild(c)}}}}
    }
    private fun chooseChild(c: JSONObject) {task{needProfile();val kids=api.list("be_family_children?select=id,display_name&parent_id=eq.${api.uid}").rows();ui{if(kids.isEmpty())AlertDialog.Builder(this).setMessage("Add your child’s profile first.").setPositiveButton("Add child"){_,_->childForm()}.setNegativeButton("Cancel",null).show()else AlertDialog.Builder(this).setTitle("Request for which child?").setItems(kids.map{it.getString("display_name")}.toTypedArray()){_,i->task{api.write("be_family_class_requests",JSONObject().put("parent_id",api.uid).put("child_id",kids[i].getString("id")).put("class_id",c.getString("id")));ui{notice("Request submitted. The school will confirm availability.")}}}.show()}}}
    private fun eventsScreen() {
        page("School events","events");val stamp=revision;task{val events=api.list("be_school_events?select=*&published=eq.true&order=starts_at").rows();val mine=if(api.signedIn)api.list("be_event_rsvps?select=*&parent_id=eq.${api.uid}").rows()else emptyList();ui(stamp){if(events.isEmpty())text("No events have been published yet.");for(e in events){val box=card(e.optString("title"),"${formatTime(e.optString("starts_at"))}\n${e.optString("venue").replace("null","")}\n\n${e.optString("description")}");val r=mine.find{it.optString("event_id")==e.getString("id")};val going=r?.optString("status")=="going";action(if(going)"Cancel my attendance"else"I’d like to attend",box){if(!api.signedIn)auth()else task{needProfile();val body=JSONObject().put("parent_id",api.uid).put("event_id",e.getString("id")).put("status",if(going)"cancelled"else"going");api.write("be_event_rsvps",body,r?.let{"id=eq.${it.getString("id")}&parent_id=eq.${api.uid}"});ui{eventsScreen()}}}}}}
    }
    private fun newsScreen() {page("School news","news");val stamp=revision;task{val rows=api.list("be_public_content?select=title,summary&published=eq.true&publish_at=lte.${java.net.URLEncoder.encode(java.time.Instant.now().toString(),"UTF-8")}&order=created_at.desc").rows();ui(stamp){if(rows.isEmpty())text("No school announcements yet.");rows.forEach{card(it.optString("title"),it.optString("summary"))}}}}
    private fun messagesScreen() {
        page("Messages to school","messages");val subject=input("Subject");val body=input("Your message",multiline=true)
        action("Send message"){val s=subject.text.toString();val b=body.text.toString();task{needProfile();api.write("be_parent_messages",JSONObject().put("parent_id",api.uid).put("subject",School.requireText(s,3,140,"Subject")).put("body",School.requireText(b,10,3000,"Message")));ui{messagesScreen();notice("Your message was sent to the school.")}}}
        val stamp=revision;task{val rows=api.list("be_parent_messages?select=subject,body,staff_reply,status&parent_id=eq.${api.uid}&order=created_at.desc&limit=50").rows();ui(stamp){rows.forEach{card(it.optString("subject"),it.optString("body")+"\n\nStatus: "+it.optString("status")+it.optString("staff_reply").takeIf{x->x.isNotBlank()&&x!="null"}.let{x->if(x==null)""else"\nSchool reply: $x"})}}}
    }
    private fun requestsScreen() {
        page("My requests & applications","requests");val stamp=revision
        action("Full 2027 application (school website)"){web("apply-2027.html")}
        text("The full application and policy documents currently open on the school website. Sign in there with the same account.",16f,muted)
        task{val classes=api.list("be_family_class_requests?select=id,status,be_regular_classes(title),be_family_children(display_name)&parent_id=eq.${api.uid}").rows();val apps=api.list("be_applications_2027?select=child_full_name,status,review_note&parent_id=eq.${api.uid}").rows();val proposals=api.list("be_presenter_requests?select=class_title,status,school_reply&requested_by=eq.${api.uid}").rows();ui(stamp){text("Class requests",22f,bold=true);if(classes.isEmpty())text("No class requests yet.");classes.forEach{c->val box=card(c.optJSONObject("be_regular_classes")?.optString("title").orEmpty(),"${c.optJSONObject("be_family_children")?.optString("display_name").orEmpty()} · ${c.optString("status")}");if(c.optString("status")!="cancelled")action("Cancel request",box){task{api.write("be_family_class_requests",JSONObject().put("status","cancelled"),"id=eq.${c.getString("id")}&parent_id=eq.${api.uid}");ui{requestsScreen()}}}};text("School applications",22f,bold=true);if(apps.isEmpty())text("No applications yet.");apps.forEach{card(it.optString("child_full_name"),"${it.optString("status")}\n${it.optString("review_note").replace("null","")}")};text("My class proposals",22f,bold=true);proposals.forEach{card(it.optString("class_title"),"${it.optString("status")}\n${it.optString("school_reply").replace("null","")}")}}}
    }
    private fun providerScreen() {
        page("Offer a class","provider");text("Proposals are private and need school approval. Dates and fees are not confirmed by submission.",16f,muted)
        val fields=linkedMapOf<String,EditText>()
        for((key,label) in listOf("presenter_name" to "Your name","contact_email" to "Contact email","contact_phone" to "Contact phone","organisation" to "Organisation (optional)","class_title" to "Class title","class_description" to "Describe your class","age_group" to "Age group","experience" to "Qualifications and experience","preferred_start" to "First session: YYYY-MM-DD HH:MM (South African time)","course_end" to "Course end: YYYY-MM-DD","duration_minutes" to "Minutes per session","frequency" to "Frequency: once / weekly / fortnightly / monthly / other","session_count" to "Number of sessions","availability" to "Other availability","fees" to "Fees / free / sponsorship needed","materials" to "Materials and who supplies them","space_needs" to "Space and equipment needed","max_attendees" to "Maximum participants"))fields[key]=input(label,when(key){"presenter_name"->profile?.optString("display_name").orEmpty();"contact_email"->api.email;"contact_phone"->profile?.optString("phone").orEmpty().replace("null","");else->""},multiline=key in listOf("class_description","experience","availability","materials","space_needs"))
        val privacy=check("I consent to the school privately reviewing this proposal and contacting me.");val safeguarding=check("I understand the school may require references, screening and safeguarding checks before confirming a class.")
        action("Submit proposal"){val values=fields.mapValues{it.value.text.toString().trim()};val ok=privacy.isChecked&&safeguarding.isChecked;task{needProfile();School.requireConsent(ok);val start=LocalDateTime.parse(values.getValue("preferred_start").replace(' ','T')).atOffset(ZoneOffset.ofHours(2));require(start.isAfter(OffsetDateTime.now())){"Choose a future first session."};val end=LocalDate.parse(values.getValue("course_end"));require(!end.isBefore(start.toLocalDate())){"Course end cannot be before the first session."};val p=JSONObject().put("requested_by",api.uid).put("preferred_start",start.toString()).put("course_end",end.toString());for((k,v)in values)if(k !in listOf("preferred_start","course_end","duration_minutes","session_count","max_attendees"))p.put(k,if(k=="organisation")v else School.requireText(v,2,if(k=="class_description")3000 else 1500,k.replace('_',' ')));require(values.getValue("frequency") in listOf("once","weekly","fortnightly","monthly","other")){"Choose once, weekly, fortnightly, monthly or other for frequency."}; for((key,bounds) in mapOf("contact_phone" to (5..40),"organisation" to (0..150),"class_description" to (20..2000),"age_group" to (2..100),"experience" to (10..1500),"availability" to (5..1000),"fees" to (3..500),"materials" to (2..1000),"space_needs" to (2..1000))) p.put(key,School.requireText(values.getValue(key),bounds.first,bounds.last,key.replace('_',' ')));p.put("contact_email",School.requireEmail(values.getValue("contact_email"))).put("presenter_name",School.requireName(values.getValue("presenter_name"))).put("class_title",School.requireText(values.getValue("class_title"),3,140,"Class title"));for((k,range)in listOf("duration_minutes" to (15..240),"session_count" to (1..100),"max_attendees" to (1..200)))p.put(k,School.requireCount(values.getValue(k),range.first,range.last,k));api.write("be_presenter_requests",p);ui{home();notice("Your proposal was submitted. The school will review it before confirming a date.")}}}
    }
    private fun staffScreen() {
        page("School overview","staff");val stamp=revision;task{val roles=api.list("be_staff_memberships?select=staff_role&user_id=eq.${api.uid}").rows();val role=roles.firstOrNull()?.optString("staff_role").orEmpty();check(role in listOf("staff","admin")){"School team access is required."};val apps=api.list("be_applications_2027?select=id,status").rows();val parents=api.list("be_parent_profiles?select=user_id").length();val children=if(role=="admin")api.list("be_school_enrolments?select=id,status,school_year&school_year=eq.${LocalDate.now().year}").rows()else emptyList();val research=if(role=="admin")api.list("be_fundraiser_analysis?select=project_id,analysis,selected").rows()else emptyList();ui(stamp){card("Parent accounts",parents.toString());card("Applications visible to your role",apps.size.toString());if(role=="admin")card("Enrolled this year",children.count{it.optString("status")=="enrolled"}.toString());text("Counts come from school records and depend on the register being populated. Staff administration is also available on the school website.",16f,muted);action("Full school administration (website)"){web("principal.html")};for(r in research){val a=r.getJSONObject("analysis");val n=a.getJSONArray("counts").getInt(1);val net=n*(a.getInt("price")-a.getInt("variable"))-a.getInt("fixed");val b=card(a.optString("title"),a.optString("model")+"\n\nIllustrative surplus at $n ${a.optString("unit")}: R$net. Estimates, not money raised.\n\n"+a.optString("checks"));action(if(r.optBoolean("selected"))"Chosen for follow-up"else"Choose this idea",b){task{api.rpc("be_choose_fundraiser_idea",JSONObject().put("p_project_id",r.getString("project_id")));ui{staffScreen()}}}}}}
    }
    private fun policies(){page("School information","policies");text("Butterflies Educare\n84 Dirkie Uys Street, Goodwood\n083 471 7929\nButterfliesedu@gmail.com",18f);action("2027 fees and payment policy"){web("fees-policy.html")};action("Privacy notice"){web("privacy.html")};action("Download paper registration"){web("registration-print.html")};text("Policies and printable documents open in your browser. Daily app features use native Android screens.",16f,muted)}
    private fun back(){when(screen){"home"->super.onBackPressed();"child-form"->childrenScreen();"profile","children","requests","policies","staff"->accountScreen();else->home()}}
    @Deprecated("Deprecated in Java") override fun onBackPressed(){back()}
}
