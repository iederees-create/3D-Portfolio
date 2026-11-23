package za.co.butterflies.shared

/** Shared app rules. Android UI and secure storage stay in the platform module. */
object School {
    const val version = "0.1.0"
    const val website = "https://iederees-create.github.io/3D-Portfolio/butterflies-educare/"
    const val backend = "https://sijvvbozaufzpjirijhb.supabase.co"
    const val publicKey = "sb_publishable_dWWgbtZUAGVqIEvjMU5DFA_3Pi98GHU"
    fun requireName(value: String): String = value.trim().also {
        require(it.length in 2..100) { "Enter a name between 2 and 100 characters." }
    }
    fun requireEmail(value: String): String = value.trim().lowercase().also {
        require(it.length <= 254 && Regex("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$").matches(it)) { "Enter a valid email address." }
    }
    fun requirePassword(value: String) = value.also { require(it.length >= 8) { "Use at least eight characters for your password." } }
    fun requireText(value: String, min: Int, max: Int, label: String): String = value.trim().also {
        require(it.length in min..max) { "$label must have $min–$max characters." }
    }
    fun requireCount(value: String, min: Int, max: Int, label: String): Int =
        (value.toIntOrNull() ?: error("Enter a number for $label.")).also {
            require(it in min..max) { "$label must be between $min and $max." }
        }
    fun requireConsent(accepted: Boolean) { require(accepted) { "Please read and accept the privacy acknowledgement." } }
    fun safeWebPath(path: String): String {
        require(Regex("^[a-z0-9-]+\\.html(?:#[a-z0-9-]+)?$").matches(path))
        return website + path
    }
}
