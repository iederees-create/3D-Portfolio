plugins { id("com.android.application"); kotlin("android") }
android {
    namespace = "za.co.butterflies.app"
    compileSdk = 35
    defaultConfig {
        applicationId = "za.co.butterflies.educare"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0-test"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
    buildTypes { release { isMinifyEnabled = false } }
    lint { disable += "OldTargetApi" }
}
kotlin { jvmToolchain(17) }
dependencies {
 implementation(project(":shared"))
 androidTestImplementation("androidx.test:runner:1.6.2")
 androidTestImplementation("androidx.test:core:1.6.1")
 androidTestImplementation("androidx.test.ext:junit:1.2.1")
}
