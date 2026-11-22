---
title: "SAP confirms ECC maintenance dates: what 2027 and 2030 mean for your historical documents"
slug: sap-ecc-2027-2030-maintenance-dates-historical-documents
url: https://iederees-create.github.io/3D-Portfolio/blog/sap-ecc-2027-2030-maintenance-dates-historical-documents/
publish_date: 2026-11-22
author: "Iederees Francis, NextGenWebs"
meta_description: "SAP has reconfirmed ECC mainstream maintenance ends in 2027, with extended cover to 2030. What the timeline means for your SAP document archive."
tags: [SAP ECC, S/4HANA, SAP maintenance, Document archiving, UK manufacturing]
disclosure: "The author is an independent business-development partner working with delaware. Not an official SAP, delaware or d.velop publication."
---

# SAP confirms ECC maintenance dates: what 2027 and 2030 mean for your historical documents

In October 2026, SAP published a detailed update for customers still running SAP Business Suite 7, the family that includes SAP ERP 6.0, better known as ECC. The headline is simple: the dates have not moved. The detail is more interesting, especially for manufacturers whose ECC systems run on third-party databases, and for anyone who has not yet decided what happens to the documents attached to those systems.

## What SAP confirmed

Writing on the SAP News Center on 7 October 2026, Philipp Herzig stated that "the dates for SAP Business Suite 7 maintenance have not changed: mainstream maintenance remains available through December 31, 2027, followed by optional extended maintenance through December 31, 2030" ([SAP News Center](https://news.sap.com/2026/10/beyond-2030-sap-business-suite-7-sap-netweaver-customers-third-party-databases-java/)).

These are the dates SAP first set out in February 2020, when it also committed to keeping at least one release of S/4HANA in maintenance until the end of 2040 ([SAP Support, Maintenance 2040](https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html)).

The 2027 date applies to SAP ERP 6.0 on enhancement packages 6, 7 or 8. According to SAP's own community guidance, systems with no enhancement package, or on enhancement packages 1 to 5, already left mainstream maintenance on 31 December 2025 and are now in customer-specific maintenance ([SAP Community](https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/maintenance-timelines-for-sap-erp-6-0-quot-ecc-quot/ba-p/13524564)).

## How extended maintenance works

Extended maintenance is optional and must be chosen. An SAP briefing for user groups, dated October 2026, sets out the commercial terms ([SAP, Managing SAP Business Suite 7 Extended Maintenance](https://assets.dm.ux.sap.com/sap-user-groups/pdfs/261020_managing_sap_business_suite_7_extended_maintenance.pdf)):

- It runs from 1 January 2028 to 31 December 2030, with a scope similar to mainstream maintenance.
- For on-premise customers it needs a separate addendum to the existing support agreement. It is included for SAP ERP, private edition.
- It costs an additional two percentage points on the maintenance base. SAP's own example is a customer paying 22% for Enterprise Support who would pay 24% in total.
- It applies to the whole commercial landscape of Business Suite 7 core applications, not to selected systems.
- It can be ended with 90 days' notice to the end of a year.

SAP's community guidance adds that extended maintenance is meant as a bridge for customers who cannot finish their transition in time, not a long-term alternative, and that customers are advised to complete the ordering process by Q3 2027 ([SAP Community](https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/maintenance-timelines-for-sap-erp-6-0-quot-ecc-quot/ba-p/13524564)).

## What changes at the end of 2030

The main purpose of SAP's October article was to explain what happens when extended maintenance ends. Several support arrangements expire at the same time, including SAP's reselling and support agreements for third-party databases and its support arrangements for Java used with SAP NetWeaver AS Java 7.5 ([SAP News Center](https://news.sap.com/2026/10/beyond-2030-sap-business-suite-7-sap-netweaver-customers-third-party-databases-java/)).

According to SAP, after 2030:

- On-premise Business Suite 7 systems move into customer-specific maintenance, and what SAP can deliver there is further restricted for third-party database and Java environments, including kernel patches and database tooling.
- SAP says customers "should therefore not regard customer-specific maintenance for affected environments as a sustainable long-term operating model of business-critical systems."
- Tooling for a system conversion from Business Suite 7 on a third-party database to S/4HANA or SAP Cloud ERP will only be available before the end of 2030. After that, SAP says only greenfield (new implementation) scenarios will be supported.

SAP also describes a time-bound Transition Option for SAP ERP, aimed at the largest and most complex customers whose move is under way but will not finish in time. It covers 2031 to 2033, requires systems to be moved to SAP ERP, private edition on SAP HANA before 31 December 2030, and has further eligibility rules.

Michael Bloch, a board member of the German-speaking SAP User Group (DSAG), is quoted in the article welcoming the early communication and adding that "any decision should be based on a comprehensive assessment of all available alternatives and their respective long-term consequences."

## Why this matters for documents, not just systems

*The rest of this section is my own view, based on the timeline above and conversations with SAP teams.*

Most of the planning around 2027 and 2030 focuses on systems, databases and code. Documents tend to come later. But the choices SAP describes have a direct effect on them:

- **Conversion or new implementation.** A system conversion and a greenfield implementation treat history very differently. If your route is, or becomes, greenfield, you need a clear plan for documents linked to ECC transactions that will not exist in the new system.
- **Keeping old systems alive.** Running a legacy system only so people can reach old documents becomes harder to justify as support narrows. Separating document retention and access from the application gives you more freedom.
- **Retention obligations do not follow SAP's calendar.** UK businesses must keep VAT records for at least six years ([GOV.UK](https://www.gov.uk/charge-reclaim-record-vat/keeping-vat-records)), and other records have their own rules. Some documents created in ECC will need to outlive it.

A useful test for any programme team is this question: if you switched your existing SAP archive off tomorrow, what would you do with all the historical documents that still need to be retained and accessed?

## Practical next steps

1. Check which enhancement package and database each ECC system runs on, and what that means for your dates.
2. Decide whether extended maintenance is part of your plan, and for how long.
3. Add historical documents to the S/4HANA programme plan, with a named owner.
4. List the document types linked to ECC and the retention period for each.

## Want to talk it through?

If you are working out what happens to your SAP documents as these dates approach, take the [3-minute SAP Archive Readiness Check]({{QUIZ_LINK}}) or book a [free 30-minute consultation]({{BOOKING_LINK}}) with delaware specialists John or Oksana. The consultation covers SAP Private Cloud and on-premise landscapes, and there is no obligation.

---

*I'm Iederees Francis of NextGenWebs, an independent business-development partner working with delaware. I am not employed by SAP, delaware or d.velop. This article is general information, not legal or contractual advice. Check your own SAP contracts and SAP Notes for the terms that apply to you.*

## Sources

- SAP News Center, Philipp Herzig, "Planning Beyond 2030: What SAP Business Suite 7 and SAP NetWeaver Customers Using Third-Party Databases or Java Need to Know", 7 October 2026: https://news.sap.com/2026/10/beyond-2030-sap-business-suite-7-sap-netweaver-customers-third-party-databases-java/
- SAP Support, "Clarity and Choice on SAP Business Suite 7": https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html
- SAP, "Managing SAP Business Suite 7 Extended Maintenance", October 2026 (PDF): https://assets.dm.ux.sap.com/sap-user-groups/pdfs/261020_managing_sap_business_suite_7_extended_maintenance.pdf
- SAP Community, "Maintenance Timelines for SAP ERP 6.0 (ECC)": https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/maintenance-timelines-for-sap-erp-6-0-quot-ecc-quot/ba-p/13524564
- GOV.UK, "Keeping VAT records": https://www.gov.uk/charge-reclaim-record-vat/keeping-vat-records
