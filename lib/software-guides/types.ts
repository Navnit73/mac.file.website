export type SoftwareGuideStep = { title: string; detail: string };

export type SoftwareGuide = {
  slug: string;
  badge: string;
  keyword: string;
  secondaryKeywords: string[];
  /** <title> without brand suffix */
  title: string;
  /** <title> tag, kept under ~60 chars incl. brand */
  metaTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  quickAnswer: string;
  prerequisites: { title: string; items: string[] };
  stepsHeading: string;
  steps: SoftwareGuideStep[];
  troubleshooting: { headers: string[]; rows: string[][] };
  extra: { heading: string; intro: string; bullets: { label: string; text: string }[] };
  fileBased: { heading: string; body: string };
  faqs: { question: string; answer: string }[];
  related: { title: string; description: string; href: string }[];
  verifyNote: string;
};
