export const faqGroups = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      { question: "Who is BRIDGE CST designed for?", answer: "BRIDGE CST is designed for aspiring and early-career customer support professionals, especially people preparing for a first role or moving from beginner to intermediate." },
      { question: "Is BRIDGE CST free?", answer: "Yes. The public Journey Cards, Guides, Practice Labs, and Resources are free to explore. An account is optional and is used to sync learning progress and saved practice responses." },
      { question: "Do I need customer support experience?", answer: "No. Foundations begins without assuming prior industry knowledge. Technical topics are introduced gradually and difficult terms are explained in context." },
      { question: "Is BRIDGE CST only for people in Pakistan?", answer: "No. It is built in Pakistan with a global outlook. The examples are useful for learners anywhere, while some career guidance directly addresses Pakistan-based applicants pursuing international work." },
    ],
  },
  {
    id: "learning",
    title: "Journey Cards and learning",
    items: [
      { question: "How do Journey Cards work?", answer: "Each Journey Card teaches one practical idea through a skill goal, explanation, realistic scenario, Practice Lab, interview connection, and key takeaway. Collections place related cards in a recommended order." },
      { question: "Where should I begin?", answer: "Begin with the Foundations collection if you are new. If you already work in support, choose the collection closest to the skill you want to strengthen." },
      { question: "Does the Practice Lab automatically know whether my answer is correct?", answer: "Practice Lab feedback checks whether your response includes the card's core ideas. It is a learning aid, not a human grading system. Compare the feedback and model structure, then improve the reasoning in your own words." },
      { question: "How long does a Journey Card take?", answer: "Most cards are designed for a short focused session. Reading time varies by subject, and practical exercises may take longer when you revise your answer carefully." },
    ],
  },
  {
    id: "careers",
    title: "Careers and interviews",
    items: [
      { question: "Will BRIDGE CST get me a job?", answer: "No platform can guarantee a job. BRIDGE CST helps you build relevant skills, practice realistic situations, strengthen applications, and prepare clearer interview examples." },
      { question: "Can BRIDGE CST help with interviews?", answer: "Yes. Journey Cards connect skills to common interview questions, and the Guides include structured advice for behavioural and scenario-based customer support interviews." },
      { question: "Does BRIDGE CST provide a certificate?", answer: "Not currently. The priority is practical evidence and job readiness. A meaningful assessment or certificate should only be introduced when it can verify real capability." },
      { question: "Can I use my Practice Lab work in a portfolio?", answer: "You can adapt fictional exercises into clearly labelled portfolio samples. Do not include real customer information, confidential employer material, or claims that the scenario was paid professional work when it was not." },
    ],
  },
  {
    id: "accounts",
    title: "Accounts, progress, and privacy",
    items: [
      { question: "Why should I create an account?", answer: "An account allows BRIDGE CST to sync completed cards and saved practice responses so you can return to your learning path on another session or supported device." },
      { question: "Can I learn without signing in?", answer: "Yes. Public learning content remains accessible without an account. Progress may only remain on the current device until you sign in." },
      { question: "Should I enter real customer information in Practice Labs?", answer: "No. Never enter names, email addresses, phone numbers, account details, passwords, tokens, payment information, or confidential employer data. Use fictional details." },
      { question: "How do I report a problem with a card?", answer: "Use the feedback section at the end of a Journey Card. Report unclear language, outdated information, a broken resource, or an accessibility issue without including private customer information." },
    ],
  },
];

export const homepageFaqs = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[1].items[0],
  faqGroups[1].items[2],
  faqGroups[2].items[1],
  faqGroups[3].items[1],
];

export const allFaqs = faqGroups.flatMap((group) => group.items);
