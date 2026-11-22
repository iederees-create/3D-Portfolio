---
title: "UK e-invoicing from April 2029: what the new HMRC roadmap means for SAP teams"
slug: uk-e-invoicing-2029-roadmap-sap-document-retention
url: https://iederees-create.github.io/3D-Portfolio/blog/uk-e-invoicing-2029-roadmap-sap-document-retention/
publish_date: 2026-11-26
author: "Iederees Francis, NextGenWebs"
meta_description: "The UK's e-invoicing roadmap confirms VAT e-invoices from 1 April 2029, using Peppol. What SAP teams in manufacturing should note on storage and retention."
tags: [E-invoicing, HMRC, VAT, Peppol, SAP, Document retention, UK manufacturing]
disclosure: "The author is an independent business-development partner working with delaware. Not an official SAP, delaware, d.velop or HMRC publication."
---

# UK e-invoicing from April 2029: what the new HMRC roadmap means for SAP teams

On 28 October 2026 the UK government published its roadmap for e-invoicing, alongside an HMRC policy paper on the legislation behind it. For UK manufacturers running SAP, this is one of the most significant changes to invoicing in years. It affects how invoices are sent and received, and it puts fresh attention on how they are stored and kept.

Here is what has been confirmed, what is still to come, and what SAP and IT teams may want to consider now.

## What has been confirmed

According to the [Roadmap for e-invoicing implementation](https://www.gov.uk/government/publications/e-invoicing-implementation-roadmap/roadmap-for-e-invoicing-implementation), published 28 October 2026:

- From **1 April 2029**, VAT-registered persons, including public sector bodies, will need to be able to issue and receive VAT invoices as e-invoices, unless a specific exemption applies.
- The requirement was first announced at Budget 2025. The roadmap says the government intends it to apply broadly, with exemptions "tightly defined and limited".
- The government will give full details of scope, exemptions, standards and obligations **12 to 18 months** before the requirement takes effect. It aims to confirm the requirements between **October 2027 and April 2028**, giving at least 12 months to prepare.
- A public technical consultation on the proposed UK e-invoicing standards is planned for **spring 2027**. The roadmap expects it to be of most interest to software providers and others implementing the standards.

The accompanying HMRC policy paper, [E-invoicing requirements](https://www.gov.uk/government/publications/vat-electronic-invoicing/e-invoicing-requirements), adds that:

- Legislation in Finance Bill 2026-27 will provide enabling powers, with technical requirements set out in secondary legislation.
- **Peppol** will be the core interoperability framework for UK e-invoicing, as announced at Tax Update day 2026.
- HMRC will take on the functions needed to act as the UK Peppol Authority. The paper states it "is not yet determined when HMRC will become the Authority."

The government's foreword links the change to wider aims, including tackling late payments alongside the Commercial Payments Bill.

## What e-invoicing means today

It helps to know where the current rules stand. HMRC's [VAT Notice 700/63](https://www.gov.uk/guidance/electronic-invoicing-notice-70063) defines electronic invoicing as "the transmission and storage of invoices in an electronic format without duplicate paper documents", and says the format may be structured, such as XML, or unstructured, such as PDF. At present, electronic invoices are allowed where the customer agrees, and the rules do not prescribe a particular system, as the policy paper also notes.

The 2029 regime will be different in that e-invoices become a requirement for VAT invoices between VAT-registered persons, with a common framework. The detailed format and technical standards have not yet been set. **I have not been able to confirm** which formats will be accepted, or how existing EDI arrangements will be treated. Those details are due with the requirements in 2027 to 2028.

## Storage and retention still matter

Sending an invoice through a network is only half of the story. The invoice also has to be kept.

Under current HMRC guidance:

- VAT records, including copies of invoices issued and all invoices received, must be kept for at least six years, or ten years for the VAT One Stop Shop scheme ([GOV.UK, Keeping VAT records](https://www.gov.uk/charge-reclaim-record-vat/keeping-vat-records)).
- Businesses storing invoices electronically must be able to ensure their authenticity, integrity and legibility throughout the storage period, and keep history files so details from any point in the past can be found if HMRC asks ([VAT Notice 700/63, section 5](https://www.gov.uk/guidance/electronic-invoicing-notice-70063)).
- Where records are kept on computer media, the business must be able to produce them in a legible form on request. HMRC guidance says programs must be kept, or other arrangements made, so data can be reconstructed if systems are changed or upgraded ([HMRC Compliance Handbook, CH15500](https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch15500)).

The roadmap does not, as far as I can see, change these retention rules. **Whether the 2029 regime will add new storage requirements is not yet known.**

## Why the timing matters for SAP teams

*This section is my own view.*

For many UK manufacturers on SAP, two timelines now overlap. SAP has confirmed that mainstream maintenance for ECC ends on 31 December 2027, with optional extended maintenance to 31 December 2030 ([SAP News Center](https://news.sap.com/2026/10/beyond-2030-sap-business-suite-7-sap-netweaver-customers-third-party-databases-java/)). The UK e-invoicing requirements are due to be confirmed between October 2027 and April 2028 and to take effect in April 2029.

That means some organisations will be redesigning invoice processes, moving to S/4HANA and deciding what to do with legacy systems in roughly the same window. Invoices are among the most common documents in any SAP archive. A few questions follow naturally:

- **Where will e-invoices be stored,** and will they be linked to the SAP documents they relate to?
- **How will older invoices be kept** if the system they were created in is retired before their retention period ends?
- **Who owns retention** for invoices across finance, IT and the SAP programme?
- **Can you show integrity and legibility** for invoices stored over six years or more, across a system change?

None of this requires waiting for the final standards. An inventory of where invoices live today, and how long they must be kept, is useful whatever the final rules say.

## Practical next steps

1. Read the roadmap and note the dates that apply to you, especially the spring 2027 consultation and the October 2027 to April 2028 window.
2. Map where supplier and customer invoices are stored today, in SAP and outside it.
3. Check whether your S/4HANA plan covers invoice storage and access for historical invoices.
4. Talk to your tax and finance teams early, so the invoicing and archive decisions line up.

## Want to talk it through?

If you are working out how invoice storage and retention fit into your SAP plans, try the [3-minute SAP Archive Readiness Check]({{QUIZ_LINK}}) or book a [free 30-minute consultation](/sap-archive/book/) with delaware specialists John or Oksana. The consultation covers SAP Private Cloud and on-premise landscapes. It is not tax advice, and there is no obligation.

---

*I'm Iederees Francis of NextGenWebs, an independent business-development partner working with delaware. I am not employed by SAP, delaware or d.velop. This article is general information, not tax or legal advice.*

## Sources

- GOV.UK, "Roadmap for e-invoicing implementation", 28 October 2026: https://www.gov.uk/government/publications/e-invoicing-implementation-roadmap/roadmap-for-e-invoicing-implementation
- GOV.UK / HMRC, "E-invoicing requirements" policy paper (part of "VAT: electronic invoicing"), 28 October 2026: https://www.gov.uk/government/publications/vat-electronic-invoicing/e-invoicing-requirements
- HMRC, "Electronic invoicing (VAT Notice 700/63)": https://www.gov.uk/guidance/electronic-invoicing-notice-70063
- GOV.UK, "Keeping VAT records": https://www.gov.uk/charge-reclaim-record-vat/keeping-vat-records
- HMRC Compliance Handbook, CH15500: https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch15500
- SAP News Center, 7 October 2026: https://news.sap.com/2026/10/beyond-2030-sap-business-suite-7-sap-netweaver-customers-third-party-databases-java/
