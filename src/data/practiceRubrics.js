export const practiceRubrics = {
  "what-customer-support-means": {
    minimumWords: 18,
    criteria: [
      {
        label: "Confirm what changed and when",
        prompt: "Ask when the problem began and what changed when the customer moved phones.",
        why: "Timing and recent changes narrow the investigation before instructions are given.",
        signals: ["when", "started", "began", "stopped", "changed", "previous phone", "new phone"],
      },
      {
        label: "Identify the device or service context",
        prompt: "Ask about the old and new device, service, SIM, eSIM, signal, or connection state.",
        why: "Device and service context helps separate an account problem from a device or network problem.",
        signals: ["device", "model", "phone", "sim", "esim", "service", "signal", "network", "connection"],
      },
      {
        label: "Check symptoms and previous attempts",
        prompt: "Ask what the customer currently sees and what they have already tried.",
        why: "Visible symptoms and previous attempts prevent repetition and unsafe assumptions.",
        signals: ["tried", "attempted", "already", "see", "shows", "error", "message", "restart", "currently"],
      },
    ],
  },
  "customer-support-mindset": {
    minimumWords: 28,
    criteria: [
      {
        label: "Recognize the repeated effort and impact",
        prompt: "Acknowledge that the customer has contacted support repeatedly and should not need to start over.",
        why: "Recognition shows that the history and customer effort have been understood.",
        signals: ["again", "already contacted", "several times", "multiple times", "third time", "repeated", "repeating concern", "repeat everything", "still unresolved", "remains unresolved"],
      },
      {
        label: "Take practical ownership",
        prompt: "Explain that you will review the history and investigate what remains unresolved.",
        why: "Ownership is demonstrated through action, not only through an apology.",
        signals: ["review", "investigate", "look into", "check", "take ownership", "take responsibility", "previous conversation", "history"],
      },
      {
        label: "Set a clear next step or update",
        prompt: "Tell the customer what will happen next and how you will keep them informed.",
        why: "A clear expectation restores confidence without making an unsupported promise.",
        signals: ["next step", "update", "keep you informed", "follow up", "coordinate", "appropriate team", "clear outcome", "what happens next"],
      },
    ],
  },
  "understanding-customer-goals": {
    minimumWords: 20,
    criteria: [
      {
        label: "Explore what prompted the request",
        prompt: "Ask what happened or changed before the customer decided to cancel.",
        why: "The reason behind the request reveals the problem that may still need attention.",
        signals: ["what prompted", "what happened", "reason", "why", "changed", "experience", "issue", "problem"],
      },
      {
        label: "Understand the desired outcome",
        prompt: "Ask what the customer originally hoped to achieve or what outcome they need now.",
        why: "The desired outcome helps support respond usefully without assuming cancellation is a bluff.",
        signals: ["hoping", "expected", "wanted", "want", "goal", "outcome", "trying to", "achieve", "use the product"],
      },
      {
        label: "Respect the cancellation request",
        prompt: "Use neutral wording and make it clear that you will still help with the customer’s request.",
        why: "Discovery should clarify the situation, not pressure the customer to remain.",
        signals: ["help with your request", "before i help", "if you are comfortable", "would you share", "could you share", "understand before", "no pressure", "your decision"],
      },
    ],
  },
  "support-channels-explained": {
    minimumWords: 35,
    criteria: [
      {
        label: "Provide distinct chat and email responses",
        prompt: "Write one response for live chat and a separate response for email.",
        why: "The exercise tests whether the same issue can be adapted to two channel expectations.",
        signals: ["live chat", "chat:", "chat response", "email:", "email response", "hello", "subject"],
        minimumMatches: 2,
      },
      {
        label: "Keep chat focused and conversational",
        prompt: "Use a short chat message that asks one useful diagnostic question at a time.",
        why: "Live chat works best when the customer can respond without processing a long block of instructions.",
        signals: ["what happens", "do you see", "error message", "i can help", "let's", "try first", "when you sign in"],
      },
      {
        label: "Make email structured and safe",
        prompt: "Use a complete email that requests relevant details and warns the customer not to share a password.",
        why: "Email allows more context, but sensitive information still needs to be protected.",
        signals: ["please reply", "exact error", "password reset", "do not send your password", "do not share your password", "safe next step", "kind regards"],
        minimumMatches: 2,
      },
    ],
  },
  "understanding-the-customer-journey": {
    minimumWords: 45,
    criteria: [
      {
        label: "Map several journey stages",
        prompt: "Include at least three relevant stages such as discovery, purchase, onboarding, use, renewal, or cancellation.",
        why: "A journey becomes useful when it shows how needs change over time.",
        signals: ["discovery", "evaluation", "trial", "purchase", "onboarding", "activation", "adoption", "use", "renewal", "cancellation"],
        minimumMatches: 3,
      },
      {
        label: "Name a question or frustration at each stage",
        prompt: "Show what the customer may ask and where friction could appear.",
        why: "Questions and frustrations turn a list of stages into a realistic customer experience.",
        signals: ["question", "asks", "how do", "can i", "frustration", "confusing", "unclear", "difficult", "problem", "friction"],
        minimumMatches: 2,
      },
      {
        label: "Connect support to reduced effort",
        prompt: "Describe a useful support action for the stages you identified.",
        why: "The goal is to show how support improves the journey, not only describe it.",
        signals: ["support", "guide", "explain", "provide", "help", "reduce", "update", "quick start", "follow up"],
        minimumMatches: 2,
      },
    ],
  },
  "support-roles-and-career-paths": {
    minimumWords: 45,
    criteria: [
      {
        label: "Compare all four role families",
        prompt: "Include Customer Support, Technical Support, Customer Success, and Support Operations.",
        why: "Comparing all four prevents job titles from being treated as interchangeable.",
        signals: ["customer support", "technical support", "customer success", "support operations"],
        minimumMatches: 4,
      },
      {
        label: "Describe goals and typical work",
        prompt: "Give each role a primary goal and at least two representative tasks.",
        why: "Goals and tasks reveal how the roles create different kinds of value.",
        signals: ["goal", "tasks", "resolve", "diagnose", "onboarding", "adoption", "workflow", "metrics", "tickets", "investigate"],
        minimumMatches: 4,
      },
      {
        label: "Identify a development skill",
        prompt: "Name at least one skill you would develop for each path or clearly connect skills to the roles.",
        why: "Role comparison should lead to a practical learning decision.",
        signals: ["skill", "develop", "communication", "troubleshooting", "discovery", "analysis", "documentation", "problem solving"],
        minimumMatches: 2,
      },
    ],
  },
  "support-terminology-and-workflows": {
    minimumWords: 55,
    criteria: [
      {
        label: "Define the requested support terms",
        prompt: "Define ticket, SLA, escalation, workaround, root cause, backlog, and CSAT.",
        why: "The core vocabulary supports accurate coordination across a support team.",
        signals: ["ticket", "sla", "escalation", "workaround", "root cause", "backlog", "csat"],
        minimumMatches: 7,
      },
      {
        label: "Explain meanings rather than repeat labels",
        prompt: "Describe what the terms do using clear phrases such as recorded request, time commitment, temporary path, or customer feedback.",
        why: "Definitions demonstrate understanding only when they explain the practical meaning.",
        signals: ["recorded request", "response target", "resolution target", "right person", "temporary", "underlying", "waiting", "customer feedback", "satisfaction"],
        minimumMatches: 3,
      },
      {
        label: "Translate jargon for a new colleague",
        prompt: "Choose at least three terms and explain them in plain, conversational language.",
        why: "Support professionals must understand internal language without forcing customers or new colleagues to decode it.",
        signals: ["in simple terms", "this means", "for example", "keeps the customer", "our promised", "work still waiting", "temporary fix", "new colleague"],
        minimumMatches: 2,
      },
    ],
  },
  "building-your-support-learning-plan": {
    minimumWords: 45,
    criteria: [
      {
        label: "Choose three specific skills",
        prompt: "Name three support skills you genuinely want to improve.",
        why: "Specific priorities prevent the plan from becoming an unfocused list of courses.",
        signals: ["communication", "writing", "troubleshooting", "interview", "typing", "documentation", "technical", "product knowledge", "time management", "empathy"],
        minimumMatches: 3,
      },
      {
        label: "Define recurring practice and evidence",
        prompt: "For each skill, include a weekly practice activity and something you will create or record as evidence.",
        why: "Repeated practice and visible evidence turn intention into demonstrable ability.",
        signals: ["weekly", "each week", "twice weekly", "practice", "write", "record", "create", "sample", "portfolio", "evidence", "notes"],
        minimumMatches: 3,
      },
      {
        label: "Include feedback and review timing",
        prompt: "Name who or what will provide feedback and when you will review progress.",
        why: "A feedback source and review date make the plan adjustable and accountable.",
        signals: ["feedback", "mentor", "peer", "manager", "review", "friday", "week", "month", "date", "after four weeks", "track"],
        minimumMatches: 2,
      },
    ],
  },
};

export function getPracticeRubric(card) {
  return practiceRubrics[card?.id] || null;
}
