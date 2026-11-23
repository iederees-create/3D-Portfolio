package za.co.butterflies.shared
import kotlin.test.*
class SchoolTest {
    @Test fun accountEmailIsNormalised() { assertEquals("parent@example.com", School.requireEmail(" Parent@Example.com ")) }
    @Test fun invalidEmailAndEmptyNameRejected() { assertFailsWith<IllegalArgumentException> { School.requireEmail("parent@") }; assertFailsWith<IllegalArgumentException> { School.requireName(" ") } }
    @Test fun providerCapacityMustBeAnIntegerWithinBounds() { assertEquals(10, School.requireCount("10",1,200,"Capacity")); for (n in listOf("0","201","ten")) assertFails { School.requireCount(n,1,200,"Capacity") } }
    @Test fun externalAndTraversalUrlsRejected() { for (p in listOf("https://evil.example/", "../principal.html", "javascript:alert(1)")) assertFails { School.safeWebPath(p) }; assertTrue(School.safeWebPath("calendar.html#offer-a-class").startsWith(School.website)) }
    @Test fun consentNeverAssumed() { assertFails { School.requireConsent(false) } }
}
