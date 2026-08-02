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
  "active-listening": {
    minimumWords: 28,
    criteria: [
      {
        label: "Separate the known facts",
        prompt: "Identify that the application was updated yesterday, sign-in now fails, and the password has already been reset twice.",
        why: "Restating verified facts prevents the investigation from drifting into assumptions.",
        signals: ["updated yesterday", "application was updated", "cannot sign in", "sign-in stopped", "reset my password twice", "password twice", "two password resets"],
        minimumMatches: 2,
      },
      {
        label: "Recognize the likely emotion",
        prompt: "Name a reasonable emotion or impact without presenting it as a confirmed fact.",
        why: "Noticing repeated effort helps the agent respond with care while avoiding mind-reading.",
        signals: ["likely frustrated", "probably frustrated", "may feel frustrated", "concerned", "repeated effort", "already tried", "has not helped"],
      },
      {
        label: "Ask for the missing diagnostic details",
        prompt: "Confirm the exact error and relevant application, device, browser, or version details.",
        why: "The missing details determine whether the next step should focus on credentials, the application, or the environment.",
        signals: ["exact error", "error message", "application version", "app version", "device version", "device model", "browser", "another device", "operating system"],
        minimumMatches: 2,
      },
    ],
  },
  "asking-better-questions": {
    minimumWords: 28,
    criteria: [
      {
        label: "Clarify the delivery symptom and timing",
        prompt: "Ask whether the message is missing or delayed and when the latest verification email was requested.",
        why: "Symptom and timing distinguish a delivery delay from a complete failure or an expired request.",
        signals: ["missing entirely", "arrive late", "delayed", "when was", "latest code", "latest email", "requested", "how long"],
        minimumMatches: 2,
      },
      {
        label: "Check common filtering locations",
        prompt: "Ask the customer to check spam, junk, promotions, or a company quarantine.",
        why: "Verification messages are often delivered but filtered before reaching the main inbox.",
        signals: ["spam", "junk", "promotions", "quarantine", "filtered", "blocked"],
      },
      {
        label: "Verify the destination and narrow the cause",
        prompt: "Confirm that the account address is correct and whether it receives other messages.",
        why: "Destination and wider email delivery help separate an account typo from a verification-system problem.",
        signals: ["email address", "address shown", "address correct", "receive other", "other messages", "other emails", "multiple requests"],
        minimumMatches: 2,
      },
    ],
  },
  "showing-genuine-empathy": {
    minimumWords: 32,
    criteria: [
      {
        label: "Acknowledge the specific financial impact",
        prompt: "Recognize that the duplicate charge affects money needed for an urgent payment.",
        why: "Specific acknowledgment sounds human because it reflects the customerâ€™s actual situation.",
        signals: ["duplicate charge", "charged twice", "urgent payment", "need those funds", "need the money", "financial impact", "disruptive"],
        minimumMatches: 2,
      },
      {
        label: "Explain the immediate investigation",
        prompt: "State that you will review both transactions and check whether they are completed charges or temporary authorizations.",
        why: "Empathy becomes useful when it is connected to a relevant action.",
        signals: ["review both", "check both", "transactions", "completed charge", "pending charge", "temporary authorization", "verify"],
        minimumMatches: 2,
      },
      {
        label: "Set an honest expectation",
        prompt: "Explain the next process or timeframe without guaranteeing a refund before verification.",
        why: "Accurate expectations protect trust when the final outcome is not yet confirmed.",
        signals: ["once verified", "after i confirm", "available refund", "release process", "timeframe", "cannot promise", "without promising", "next step"],
        minimumMatches: 2,
      },
    ],
  },
  "professional-tone": {
    minimumWords: 28,
    criteria: [
      {
        label: "Remove blame and judgment",
        prompt: "Describe the temporary lock neutrally instead of blaming the customer for entering a wrong password.",
        why: "Neutral language keeps the customer focused on recovery instead of becoming defensive.",
        signals: ["temporarily locked", "temporary lock", "unsuccessful attempts", "sign-in attempts", "security lock", "account lock"],
      },
      {
        label: "Give a clear and safe next step",
        prompt: "Explain when and how the customer should try signing in again.",
        why: "Professional tone is most useful when the customer can act on it immediately.",
        signals: ["please wait", "lock to expire", "try again", "sign in again", "most recent password", "current password"],
        minimumMatches: 2,
      },
      {
        label: "Offer continued help",
        prompt: "Explain what support will do if the customer still cannot sign in.",
        why: "A conditional follow-up provides reassurance without overstating certainty.",
        signals: ["if you are still", "if it continues", "let me know", "help you", "verify the account", "next safe step", "continue investigating"],
        minimumMatches: 2,
      },
    ],
  },
  "positive-language": {
    minimumWords: 35,
    criteria: [
      {
        label: "Offer an alternative to the unavailable feature",
        prompt: "State the feature limitation honestly and provide a practical alternative.",
        why: "Positive language turns a product limitation into useful guidance without hiding the truth.",
        signals: ["not available", "available yet", "similar result", "alternative", "export option", "instead"],
        minimumMatches: 2,
      },
      {
        label: "Own the transfer to another team",
        prompt: "Explain why another team is suitable and route the request with the existing context.",
        why: "Ownership prevents the customer from feeling dismissed or forced to start over.",
        signals: ["specialists", "best equipped", "route", "transfer", "context", "already provided", "connect you"],
        minimumMatches: 2,
      },
      {
        label: "Frame the timing around what can happen",
        prompt: "Explain what can begin today and when processing can realistically finish.",
        why: "A useful timeframe focuses on progress while remaining accurate.",
        signals: ["begin today", "start today", "review today", "next business day", "completed", "processed", "timeframe"],
        minimumMatches: 2,
      },
    ],
  },
  "de-escalating-frustration": {
    minimumWords: 35,
    criteria: [
      {
        label: "Acknowledge the repeated failure",
        prompt: "Recognize that the customer received three incorrect orders and needs a clear solution.",
        why: "Naming the history shows that the customer will not need to fight to prove the impact again.",
        signals: ["three incorrect orders", "third incorrect", "repeated", "again", "clear solution", "repeated disruption"],
        minimumMatches: 2,
      },
      {
        label: "Take ownership without blame",
        prompt: "State that you will review the order history and requested items without blaming another person or team.",
        why: "Ownership lowers tension by replacing excuses with a concrete action.",
        signals: ["review", "order records", "order history", "items requested", "originally requested", "do not have to explain", "take ownership"],
        minimumMatches: 2,
      },
      {
        label: "Explain the first resolution path",
        prompt: "Describe the first action and the replacement or refund options you will confirm next.",
        why: "A specific next step moves the conversation from anger toward a realistic outcome.",
        signals: ["first", "confirm", "replacement", "refund", "fastest available", "next step", "what happens next", "available option"],
        minimumMatches: 2,
      },
    ],
  },
  "writing-clear-responses": {
    minimumWords: 48,
    criteria: [
      {
        label: "Open with the purpose",
        prompt: "Begin with a brief statement that you will help the customer reset the password.",
        why: "A clear opening tells the customer what the response will help them accomplish.",
        signals: ["help you reset", "reset your password", "password reset", "i can help"],
      },
      {
        label: "Provide ordered reset instructions",
        prompt: "Give numbered or clearly ordered steps covering Forgot password, the account email, the reset link, and the new password.",
        why: "Ordered steps reduce skipped actions and make the response easy to scan.",
        signals: ["forgot password", "email address", "reset email", "reset link", "new password", "sign in again"],
        minimumMatches: 4,
      },
      {
        label: "Explain the expected result and fallback",
        prompt: "State what success looks like and what to do if the reset email does not arrive.",
        why: "Expected results and a fallback help the customer continue without opening a new conversation.",
        signals: ["account dashboard", "sign in", "does not arrive", "spam", "new link", "reply here", "investigate delivery"],
        minimumMatches: 3,
      },
    ],
  },
  "closing-conversations": {
    minimumWords: 32,
    criteria: [
      {
        label: "Confirm the successful outcome",
        prompt: "Confirm that the application or technical issue is now working normally.",
        why: "A closing should verify resolution rather than assume the previous instruction worked.",
        signals: ["confirmed", "working again", "issue was resolved", "fixed", "working normally", "successfully"],
      },
      {
        label: "Summarize what solved the issue",
        prompt: "Briefly record the action that restored service.",
        why: "A concise summary gives the customer confidence and creates useful future context.",
        signals: ["resolved after", "clearing", "browser data", "signing in again", "restart", "what solved", "solution was"],
        minimumMatches: 2,
      },
      {
        label: "Provide a useful return path",
        prompt: "Explain what evidence to note and how to resume support if the problem returns.",
        why: "A good return path prevents the customer from having to restart the investigation.",
        signals: ["if the", "returns", "happens again", "note the time", "browser", "reply", "continue the investigation", "without starting over"],
        minimumMatches: 3,
      },
    ],
  },
};

export function getPracticeRubric(card) {
  return practiceRubrics[card?.id] || null;
}
