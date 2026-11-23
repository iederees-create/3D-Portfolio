plugins { kotlin("multiplatform") }
kotlin {
    jvm()
    if (System.getProperty("os.name").startsWith("Mac")) {
        iosArm64(); iosSimulatorArm64()
    }
    jvmToolchain(17)
    sourceSets { commonTest.dependencies { implementation(kotlin("test")) } }
}
