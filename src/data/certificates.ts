// ─── Certificates ─────────────────────────────────────────────────────────────
// Every entry below is taken from the certificate files themselves (name, issuer,
// completion/issue date). `url` is only set where the certificate prints a public
// verification link (edX verified certificates and Udemy certificate URLs).
// Where a file shows no public link, none is shown.

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface CertificateGroupData {
  title: string;
  certificates: Certificate[];
}

const edx = (id: string) => `https://courses.edx.org/certificates/${id}`;
const udemy = (id: string) => `https://ude.my/${id}`;

export const certificateGroups: CertificateGroupData[] = [
  {
    title: 'Web development, data & analytics',
    certificates: [
      { name: 'Introduction to Web Development with HTML5, CSS3, and JavaScript (CAD101EN)', issuer: 'IBM · via edX', date: 'Jun 2023', url: edx('26e4ad1d80ee46f899288a1219fe3396') },
      { name: 'Data Analytics Basics for Everyone (DA0100)', issuer: 'IBM · via edX', date: 'Aug 2023', url: edx('fe73df42b0d84ecd8b77daa75aed4747') },
      { name: 'Visualizing Data with Python (DV0101EN)', issuer: 'IBM · via edX', date: 'Nov 2023', url: edx('18b10e7cd7f24b90a18d7990b87619f6') },
      { name: 'Data Analysis (short course)', issuer: 'University of Cape Town · via GetSmarter', date: 'Nov 2021' },
      { name: 'Data Science with Python (short course)', issuer: 'University of Cape Town · via GetSmarter', date: 'Jun 2022' },
      { name: 'Power BI Data Dashboards', issuer: 'LinkedIn Learning', date: 'Dec 2023' },
    ],
  },
  {
    title: 'Marketing & web analytics',
    certificates: [
      { name: 'Digital Marketing Analytics (executive program)', issuer: 'MIT', date: 'Jan 2023' },
      { name: 'Data Monetization Strategy: Creating Value Through Data (executive program)', issuer: 'MIT', date: 'Apr 2024' },
      { name: 'Google Analytics 4 (GA4) Essential Training', issuer: 'LinkedIn Learning', date: 'Nov 2022' },
      { name: 'Marketing Tools: Digital Marketing Tools and Services (2020)', issuer: 'LinkedIn Learning', date: 'Dec 2022' },
    ],
  },
  {
    title: 'AI & ChatGPT',
    certificates: [
      { name: 'ChatGPT101: Introduction to ChatGPT', issuer: 'edX', date: 'Jun 2023', url: edx('422f769bebde433fb0a33fe6bea9350f') },
      { name: 'ChatGPT103: How to Use ChatGPT in Tech/Coding/Data', issuer: 'edX', date: 'Jun 2023', url: edx('94cad45c47084702b8caa2845a4b2034') },
      { name: 'ChatGPT104: How to Use ChatGPT in Business', issuer: 'edX', date: 'Nov 2023', url: edx('a027c4a4a2c54f7abc4f1072dae99a43') },
    ],
  },
  {
    title: 'Finance & trading',
    certificates: [
      { name: 'Stpcx.1: Introduction to Stock Trading', issuer: 'New York Institute of Finance · via edX', date: 'Jan 2024', url: edx('8babae7181b647a9baea25c44ec62b53') },
      { name: 'Stpcx.2.0: Technical Analysis and the Skill of Day Trading', issuer: 'New York Institute of Finance · via edX', date: 'Jan 2024', url: edx('8418d11716214a55ab90f767c82b8cec') },
    ],
  },
  {
    title: 'CRM & reporting',
    certificates: [
      { name: 'Learning Salesforce for Admins (2018)', issuer: 'LinkedIn Learning', date: 'Jan 2022' },
      { name: 'Salesforce: Custom Reports', issuer: 'LinkedIn Learning', date: 'Jan 2022' },
    ],
  },
  {
    title: 'Project management & leadership',
    certificates: [
      { name: 'Practical Project Management for Managers and First Time PMs', issuer: 'Udemy', date: 'Mar 2021', url: udemy('UC-0f3c2137-cd35-423b-a720-7a9cd75a6c22') },
      { name: 'Management Skills - Team Leadership Skills Masterclass 2021', issuer: 'Udemy', date: 'Mar 2021', url: udemy('UC-27df870b-8314-4abe-a31b-5f21fc1891d1') },
      { name: 'Operations Management', issuer: 'Udemy', date: 'Mar 2021', url: udemy('UC-e9fd7802-eb49-4860-8f36-5f56611aaf25') },
      { name: 'Inclusive Leadership (2022)', issuer: 'LinkedIn Learning', date: 'Feb 2023' },
      { name: 'Handling Workplace Change as an Employee', issuer: 'LinkedIn Learning', date: 'Aug 2023' },
      { name: 'Developing Your Emotional Intelligence (2017)', issuer: 'LinkedIn Learning', date: 'Jan 2024' },
      { name: 'Avoiding Burnout', issuer: 'LinkedIn Learning', date: 'Aug 2023' },
    ],
  },
];

export const certificateCount = certificateGroups.reduce((total, group) => total + group.certificates.length, 0);


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Sortable number for "Mon YYYY" dates (e.g. "Jun 2023" -> 2023.5). */
export function dateKey(date: string): number {
  const [mon, year] = date.split(' ');
  return Number(year) + MONTHS.indexOf(mon) / 12;
}

export interface FlatCertificate extends Certificate {
  topic: string;
}

export const certificates: FlatCertificate[] = certificateGroups.flatMap((group) =>
  group.certificates.map((cert) => ({ ...cert, topic: group.title })),
);
