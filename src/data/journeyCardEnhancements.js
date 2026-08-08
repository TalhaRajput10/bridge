import { getPracticeRubric } from "./practiceRubrics.js";

const collectionWhyItMatters = {
  foundations:
    "This gives you a reliable starting point for real support work and helps the rest of the platform make sense.",
  "customer-communication":
    "Customers judge both the solution and the way the conversation feels. This skill helps you be clear, calm, and useful under pressure.",
  "technical-support":
    "You do not need to be an engineer, but you do need a safe way to gather evidence, narrow possibilities, and explain what should happen next.",
  "customer-success":
    "Customer success work becomes clearer when every activity connects to a result the customer is trying to achieve.",
  "support-operations":
    "These systems and processes shape an agent’s daily work, even when a dedicated operations team manages them behind the scenes.",
  "career-hub":
    "Job readiness improves when you turn general advice into a specific piece of evidence, practice, or decision.",
  "ai-in-support":
    "AI can make support work faster, but only when a person remains responsible for accuracy, privacy, tone, and the final decision.",
  "professional-growth":
    "Small professional habits build trust, reduce avoidable stress, and prepare you for larger responsibilities.",
};

const evaluationCriteria = {
  foundations: ["Understand the customer’s goal", "Use the idea correctly", "Choose a sensible next step"],
  "customer-communication": ["Acknowledge the situation", "Communicate clearly", "Show ownership", "Set an accurate expectation"],
  "technical-support": ["Gather relevant evidence", "Use a logical sequence", "Avoid unsafe assumptions", "Document a clear next step"],
  "customer-success": ["Name the customer outcome", "Connect action to value", "Notice risk", "Agree on a next step"],
  "support-operations": ["Follow the workflow", "Prioritize responsibly", "Keep ownership clear", "Use metrics in context"],
  "career-hub": ["Match the target role", "Use truthful evidence", "Be specific", "Present the idea professionally"],
  "ai-in-support": ["Check accuracy", "Protect private data", "Use human judgment", "Provide a safe fallback"],
  "professional-growth": ["Show self-awareness", "Take practical ownership", "Include collaboration", "Make the action sustainable"],
};

const glossary = {
  API: "Application Programming Interface: a structured way for software systems to exchange requests and information.",
  authentication: "The process of proving that a user or system is who it claims to be.",
  authorization: "The decision about what an authenticated user or application is allowed to access.",
  CCaaS: "Contact Center as a Service: cloud software that manages voice and digital conversations, routing, and agent work.",
  channel: "The route a customer uses to contact support, such as chat, email, phone, or social messaging.",
  CRM: "Customer Relationship Management system: software that stores customer, account, and interaction information.",
  CSAT: "Customer Satisfaction score: feedback about how satisfied customers were with an interaction or experience.",
  "de-escalation": "Reducing tension so the conversation can return to facts, options, and next steps.",
  DNS: "Domain Name System: the system that translates a name such as example.com into the address computers use.",
  escalation: "Passing an issue to someone with the required access, expertise, or authority, together with useful evidence.",
  FCR: "First Contact Resolution: an issue resolved during the first interaction, when that is appropriate and safe.",
  helpdesk: "A ticket-focused system used to receive, assign, track, and resolve customer requests.",
  HTTP: "Hypertext Transfer Protocol: the rules used for requests and responses on the web.",
  macro: "A reusable response or action that helps agents handle repeat work consistently.",
  OAuth: "An authorization framework that can provide limited access without asking for a user’s password.",
  omnichannel: "A coordinated customer experience across several support channels.",
  QA: "Quality Assurance: a structured review of support work against agreed standards.",
  rootCause: "Root cause: the underlying reason a problem happened, not only the visible symptom.",
  SLA: "Service Level Agreement: a documented commitment or target for response or resolution time.",
  ticket: "A recorded customer request containing the conversation, status, ownership, and relevant context.",
  troubleshooting: "A deliberate process of gathering evidence, testing possibilities, and narrowing down a problem.",
  workflow: "A repeatable sequence of steps, decisions, and ownership used to complete work.",
  WPM: "Words per minute: a measure of typing speed. Accuracy matters as much as speed in support work.",
};

const cardTerms = {
  "what-customer-support-means": ["ticket", "channel", "escalation"],
  "customer-support-mindset": ["rootCause", "escalation"],
  "support-channels-explained": ["channel", "omnichannel", "CCaaS"],
  "support-terminology-and-workflows": ["CRM", "helpdesk", "ticket", "workflow", "macro"],
  "building-your-support-learning-plan": ["WPM"],
  "de-escalating-frustration": ["de-escalation", "escalation"],
  "troubleshooting-mindset": ["troubleshooting", "rootCause"],
  "reproducing-customer-issues": ["troubleshooting"],
  "browser-developer-tools": ["HTTP"],
  "api-and-http-basics": ["API", "HTTP"],
  "authentication-problems": ["authentication", "authorization", "OAuth"],
  "networking-and-dns-basics": ["DNS"],
  "technical-escalations": ["escalation", "rootCause"],
  "how-support-operations-works": ["CRM", "helpdesk", "CCaaS", "QA"],
  "ticket-lifecycle-and-routing": ["ticket", "workflow"],
  "slas-and-prioritization": ["SLA"],
  "support-metrics-that-matter": ["CSAT", "FCR"],
  "quality-assurance-in-support": ["QA"],
  "workflow-automation": ["workflow"],
  "writing-clear-responses": ["channel"],
};

const benchmarks = {
  "building-your-support-learning-plan": {
    label: "BRIDGE CST practice target",
    text:
      "Aim toward 40 WPM with at least 95% accuracy, then keep improving from your own baseline. This is a learning target, not a universal employer requirement.",
  },
  "writing-clear-responses": {
    label: "Quality checklist",
    text:
      "Put the main point first, use short paragraphs, name the next action, set an accurate expectation, and proofread before sending.",
  },
  "technical-escalations": {
    label: "Escalation completeness check",
    text:
      "Include impact, environment, reproduction steps, expected result, actual result, evidence, and the precise help you need.",
  },
  "support-metrics-that-matter": {
    label: "Use targets carefully",
    text:
      "There is no single responsible CSAT, handle-time, or first-contact target for every team. Definitions, channel, customer complexity, and unintended behavior all matter.",
  },
  "writing-a-support-resume": {
    label: "Resume readiness check",
    text:
      "Name the target role, show relevant evidence, keep dates consistent, support every claim, and test every portfolio link.",
  },
  "mastering-support-interviews": {
    label: "Interview practice check",
    text:
      "Give enough context, explain your own action and reasoning, share the result, and state what you learned. A focused 60-120 second practice answer is useful, not a hiring rule.",
  },
};

const technicalStretchCards = {
  "api-and-http-basics": {
    title: "Technical stretch: take the slow lane",
    intro:
      "This card is intentionally harder than the early Foundations cards. You are not expected to memorize protocols or write code.",
    prerequisites: [
      { label: "Reading Error Messages", cardId: "reading-error-messages" },
      { label: "Browser Developer Tools", cardId: "browser-developer-tools" },
    ],
    firstPass: [
      "A customer or app sends a request.",
      "Another system returns a response.",
      "The status code is a clue about what happened.",
      "Your support job is to collect the clue and explain it clearly, not rebuild the system.",
    ],
    checkIn:
      "After this card, can you explain request, response, and status code in your own words? If not, revisit the visual and examples before moving on.",
  },
  "networking-and-dns-basics": {
    title: "Technical stretch: understand the journey, not every machine",
    intro:
      "DNS is unfamiliar to many new agents. The useful beginner goal is understanding where a name lookup can fail, not becoming a network administrator.",
    prerequisites: [
      { label: "The Troubleshooting Mindset", cardId: "troubleshooting-mindset" },
      { label: "Reading Error Messages", cardId: "reading-error-messages" },
    ],
    firstPass: [
      "A person enters a website name.",
      "DNS helps the device find the correct internet address.",
      "A stale record, local cache, or wider outage can interrupt that lookup.",
      "A support agent confirms scope and evidence before suggesting changes.",
    ],
    checkIn:
      "After this card, can you describe DNS as the internet’s address lookup and name two safe checks? That is enough for the first pass.",
  },
};

const toolNotes = {
  "support-terminology-and-workflows":
    "Compare three different jobs: a CRM stores the relationship, a helpdesk manages support requests, and a CCaaS platform manages live contact-center channels. Some products combine these jobs.",
  "how-support-operations-works":
    "Look for the same building blocks across products: queue, customer context, conversation history, ownership, status, priority, internal notes, knowledge, and reporting.",
  "browser-developer-tools":
    "Use a safe test page and focus on the Network and Console panels. Never expose tokens, passwords, or customer information in screenshots.",
  "api-and-http-basics":
    "Use a simple fictional request-and-response example. The goal is recognizing the method, destination, result, and error clue.",
  "ticket-lifecycle-and-routing":
    "Follow one fictional ticket from new to triaged, assigned, pending, solved, and reopened so the workflow feels concrete.",
};

export function getCardEnhancement(card) {
  const termKeys = cardTerms[card.id] || [];
  const practiceRubric = getPracticeRubric(card);

  return {
    whyItMatters: collectionWhyItMatters[card.collectionId],
    evaluationCriteria:
      practiceRubric?.criteria.map((criterion) => criterion.label)
      || evaluationCriteria[card.collectionId]
      || [],
    supportSpeak: termKeys.map((key) => ({
      term: key === "rootCause" ? "Root cause" : key,
      definition: glossary[key],
    })),
    benchmark: benchmarks[card.id] || null,
    technicalStretch: technicalStretchCards[card.id] || null,
    toolNote: toolNotes[card.id] || null,
  };
}
