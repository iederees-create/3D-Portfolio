---
title: "5 questions to answer before you switch off your old SAP archive"
subtitle: "A practical guide for SAP Directors, IT Directors and Enterprise Architects in UK manufacturing"
suggested_path: /sap-archive/guide/
author: "Iederees Francis, NextGenWebs"
disclosure: "Written by an independent business-development partner working with delaware. Not an official SAP, delaware or d.velop publication."
date: 2026-11-22
---

# 5 questions to answer before you switch off your old SAP archive

*A practical guide for SAP and IT leaders in UK manufacturing*

By Iederees Francis, NextGenWebs. I work with delaware as an independent business-development partner. I am not an employee or official representative of SAP, delaware or d.velop.

---

## Why this guide exists

Many SAP customers have run the same document archive for ten years or more. It may still work. But when the SAP landscape changes, for example with a move from ECC to S/4HANA or the retirement of an old system, the archive suddenly matters again. Invoices, delivery notes, quality certificates, contracts and correspondence still need to be kept, found and governed long after the transaction that created them.

SAP has confirmed that mainstream maintenance for SAP Business Suite 7, which includes SAP ERP 6.0 (ECC), runs until 31 December 2027, with optional extended maintenance until 31 December 2030 ([SAP News Center, 7 October 2026](https://news.sap.com/2026/10/beyond-2030-sap-business-suite-7-sap-netweaver-customers-third-party-databases-java/)). For many UK manufacturers, that means decisions about legacy systems and the documents attached to them will be made in the next few years.

This guide sets out five questions worth answering before any archive is switched off, migrated or renewed. None of them needs a vendor to answer. All of them make the eventual decision easier.

---

## Question 1: What is actually in the archive, and who owns it?

It sounds basic, but it is where most surprises come from. Before deciding anything, build a simple inventory.

**What to find out:**

- **Document types.** Which kinds of documents are stored? Typical examples in manufacturing are supplier invoices, sales invoices, delivery notes, goods receipts, quality and test certificates, contracts and HR records.
- **Links to SAP.** Which SAP objects are these documents attached to? Are they linked through an SAP interface such as ArchiveLink, or stored separately?
- **Age and volume.** Roughly how far back do the documents go, and how much is there? You do not need exact numbers yet, just orders of magnitude.
- **Where else documents live.** Are there separate repositories for SAP and non-SAP content? Did acquisitions leave you with more than one archive? Are some documents on shared drives, in SharePoint or on paper?
- **Ownership.** Who owns the archive today: IT, finance, a business unit, or nobody in particular? When was it last reviewed?

**Why it matters:** you cannot decide what to migrate, retain or retire if you do not know what you have. Fragmentation, such as several repositories after acquisitions, often turns out to be a bigger issue than the archive technology itself.

**Quick test:** could you produce a one-page summary of your archive, its contents and its owner by the end of next week?

---

## Question 2: What must you keep, for how long, and can you prove it?

Retention is where legal, finance and IT priorities meet. It is also where it is easiest to over-keep or under-keep.

**What to find out:**

- **Your retention rules by document type.** For example, HMRC requires VAT records to be kept for at least six years (or ten years for businesses using the VAT One Stop Shop scheme) ([GOV.UK, Keeping VAT records](https://www.gov.uk/charge-reclaim-record-vat/keeping-vat-records)). Other records, such as product quality, safety or contractual documents, may have their own requirements set by regulation, customers or your own policy. Check these with your legal and compliance teams rather than assuming.
- **Readability over time.** HMRC guidance says that where records are kept on computer media, the business must be able to convert them into a legible form on request, and that programs must be kept, or arrangements made, to reconstruct data if systems are changed or upgraded ([HMRC Compliance Handbook, CH15500](https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch15500)). That is directly relevant if you plan to retire the system the documents depend on.
- **Proof.** Could you show an auditor or a customer which documents were retained, for how long, and when they were deleted? HMRC's electronic invoicing notice also expects stored invoices to keep their authenticity, integrity and legibility throughout the storage period ([VAT Notice 700/63](https://www.gov.uk/guidance/electronic-invoicing-notice-70063)).
- **Personal data.** Some documents contain personal data. Keeping them longer than needed creates its own risk under data protection rules.

**Why it matters:** the retention policy decides what has to survive the switch-off. Without it, the safe-looking option is often to keep everything, including old systems, indefinitely.

**Quick test:** for your three most common SAP document types, do you know the retention period and who signed it off?

---

## Question 3: How will people find documents once the old system is gone?

An archive is only useful if the right people can reach the right document quickly. Switching off a legacy system can quietly remove the only way some users know how to find things.

**What to find out:**

- **How retrieval works today.** Do users need to log into SAP and open the transaction to see the related document? Do they search shared drives or SharePoint? Do they ask a colleague?
- **Who needs access.** Finance, procurement, quality, customer service and auditors often need historical documents, and not all of them are regular SAP users.
- **Access after decommissioning.** If ECC or another system is retired, how will users reach the documents that were linked to it? Will access depend on keeping part of the old system alive?
- **Search.** Can people search by the things they actually know, such as supplier, order number or date?

**Why it matters:** separating document retention and access from the application that created the documents gives you more freedom when systems are retired. Poor access is also one of the most common everyday frustrations, and one of the easiest to overlook in a programme plan.

**Quick test:** ask someone in finance or quality to find a three-year-old supplier invoice and its delivery note. Time it.

---

## Question 4: How does the archive fit your S/4HANA plan and timeline?

Archive decisions are much easier when they are made inside the SAP transformation rather than after it.

**What to find out:**

- **Your path.** Are you converting your existing system, starting fresh, or a mix? Are you planning SAP Private Cloud or on-premise? Each path changes what happens to documents linked to ECC transactions.
- **Your dates.** Mainstream maintenance for ECC on enhancement packages 6 to 8 ends on 31 December 2027, and optional extended maintenance runs from 1 January 2028 to 31 December 2030 at an additional cost ([SAP Support, Maintenance 2040](https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html)). Where do your programme milestones sit against those dates?
- **What you will migrate.** Will you migrate every historical document, a defined period only, or none? What happens to the rest?
- **Compatibility.** Will your current archive connect to your target S/4HANA landscape in the way you need, and is it still supported for that scenario?
- **Ownership in the programme.** Is someone in the S/4HANA programme explicitly responsible for documents and archiving?

**Why it matters:** if the archive is not in the plan, it tends to be solved under time pressure near go-live, or by keeping the legacy system running "just in case".

**Quick test:** does your S/4HANA programme plan have a line item for historical documents with a named owner?

---

## Question 5: What does the current archive really cost, and when does it renew?

An archive that "just works" can still be worth reviewing, if only to confirm it is the right choice for the next few years. The point is not to assume a saving. It is to make the decision on purpose.

**What to find out:**

- **The full annual cost.** Include licences, support and maintenance, infrastructure and storage, and the specialist skills needed to run it. These costs are often spread across different budgets.
- **Renewal dates.** When does the current contract or support agreement renew? A renewal is a natural decision point.
- **Dependencies.** Does the archive depend on specific legacy systems, databases or skills that will be harder to keep over time?
- **Fit.** Does it still match your SAP roadmap and your preferred deployment model?

**Why it matters:** without a full picture of cost and contract timing, renewal tends to happen by default. With it, you can compare options fairly, including staying where you are.

**Quick test:** could you state the full annual cost of your archive and its next renewal date with confidence?

---

## A one-page checklist

| Question | You are in good shape if... |
| --- | --- |
| 1. What is in the archive, and who owns it? | You have a short inventory and a named owner. |
| 2. What must you keep, and can you prove it? | Retention periods are agreed by document type and you can evidence them. |
| 3. How will people find documents later? | Access does not depend on keeping a retired system alive. |
| 4. How does it fit your S/4HANA plan? | Historical documents are a line item in the programme, with an owner and dates. |
| 5. What does it cost, and when does it renew? | You know the full annual cost and the next renewal date. |

If you ticked all five, you are well prepared. If two or more are open, it is worth talking it through before the next programme milestone or contract renewal.

---

## Want a second opinion?

delaware's specialists, John and Oksana, offer a **free 30-minute consultation** for SAP customers on SAP Private Cloud or on-premise landscapes. They will look at your current setup, your S/4HANA roadmap, your retention needs and how users find documents today, and give you an informed view of your options. There is no obligation, and no promise of savings before your situation has been properly assessed.

**[Book a free 30-minute consultation]({{BOOKING_LINK}})**  
Not sure where you stand? **[Take the 3-minute SAP Archive Readiness Check]({{QUIZ_LINK}})**

---

*This guide is general information, not legal or tax advice. Check retention requirements with your own legal, tax and compliance advisers. SAP and S/4HANA are trademarks or registered trademarks of SAP SE.*

### Sources

- SAP News Center, "Planning Beyond 2030: What SAP Business Suite 7 and SAP NetWeaver Customers Using Third-Party Databases or Java Need to Know", 7 October 2026: https://news.sap.com/2026/10/beyond-2030-sap-business-suite-7-sap-netweaver-customers-third-party-databases-java/
- SAP Support, "Clarity and Choice on SAP Business Suite 7" (Maintenance 2040): https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html
- GOV.UK, "Keeping VAT records": https://www.gov.uk/charge-reclaim-record-vat/keeping-vat-records
- HMRC Compliance Handbook, CH15500, "Retention periods for computer records": https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch15500
- HMRC, "Electronic invoicing (VAT Notice 700/63)": https://www.gov.uk/guidance/electronic-invoicing-notice-70063
- Campaign briefing material from the delaware d.velop practice (discovery questions and customer situations), not publicly linked.
