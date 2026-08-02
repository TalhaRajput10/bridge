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
  "troubleshooting-mindset": {
    minimumWords: 48,
    criteria: [
      {
        label: "Collect the relevant environment and symptom details",
        prompt: "Gather at least five useful details such as device, operating system, application version, image type or size, timing, and whether every photo fails.",
        why: "Environment and symptom details turn a broad crash report into testable conditions.",
        signals: ["device model", "operating system", "application version", "app version", "image format", "file type", "file size", "crash time", "every photo", "certain photos"],
        minimumMatches: 5,
      },
      {
        label: "Describe a controlled comparison",
        prompt: "Test a known-small supported image and a previously failing image under the same conditions.",
        why: "Changing one meaningful variable reveals whether the result follows the file or the wider environment.",
        signals: ["small supported image", "known working", "image that failed", "previously failed", "same device", "same conditions", "compare"],
        minimumMatches: 2,
      },
      {
        label: "Explain what the test would isolate",
        prompt: "State how the result would narrow the cause instead of claiming a diagnosis in advance.",
        why: "A controlled test is useful only when its possible results change the investigation.",
        signals: ["isolate", "narrow", "whether", "linked to", "file", "image data", "environment", "application"],
        minimumMatches: 2,
      },
    ],
  },
  "reproducing-customer-issues": {
    minimumWords: 65,
    criteria: [
      {
        label: "Define the starting state and environment",
        prompt: "Specify the account, cart, discount code, browser, operating system, and other conditions needed before the test begins.",
        why: "Reproduction fails when the tester begins from a different state or environment.",
        signals: ["test account", "account", "cart", "discount code", "save10", "browser", "chrome", "windows", "starting conditions"],
        minimumMatches: 4,
      },
      {
        label: "Write exact actions and test data",
        prompt: "List the checkout actions in order and identify the item, address, or discount data used.",
        why: "Repeatable actions and test data let another person run the same experiment.",
        signals: ["open checkout", "shipping details", "apply", "continue", "standard item", "valid address", "test data", "steps"],
        minimumMatches: 4,
      },
      {
        label: "Separate expected, actual, and recorded evidence",
        prompt: "State what should happen, what actually happens, and what evidence or comparison you would record.",
        why: "Expected and actual results define the defect, while recorded evidence supports investigation.",
        signals: ["expected", "actual", "discount appears", "remains disabled", "console", "network", "timestamp", "repeats", "another browser"],
        minimumMatches: 4,
      },
    ],
  },
  "reading-error-messages": {
    minimumWords: 48,
    criteria: [
      {
        label: "Capture the known error evidence",
        prompt: "Record the upload action, 14:32 UTC timestamp, HTTP 413 result, and request ID req_8472.",
        why: "Exact evidence allows the event to be traced without relying on a vague summary.",
        signals: ["upload", "14:32", "utc", "413", "req_8472", "request id"],
        minimumMatches: 4,
      },
      {
        label: "Interpret 413 without declaring the cause",
        prompt: "Explain that 413 commonly points to a request body that is too large, while clearly treating that as a clue rather than proof.",
        why: "Status codes narrow possibilities but rarely prove the complete root cause by themselves.",
        signals: ["commonly means", "usually means", "request body", "too large", "larger", "does not prove", "not confirm", "possible"],
        minimumMatches: 3,
      },
      {
        label: "Propose three relevant follow-up checks",
        prompt: "Check file size or type, documented limits, intermediary limits, and traceable logs before concluding.",
        why: "Relevant checks convert the error clue into a safe investigation path.",
        signals: ["file size", "file type", "documented limit", "documentation", "proxy", "gateway", "request id", "logs", "known working"],
        minimumMatches: 3,
      },
    ],
  },
  "browser-developer-tools": {
    minimumWords: 65,
    criteria: [
      {
        label: "Use the Console at the moment of failure",
        prompt: "Reload or reproduce the blank dashboard with DevTools open and record relevant Console errors and timestamps.",
        why: "Console evidence can reveal client-side errors that are invisible in the interface.",
        signals: ["devtools open", "reload", "reproduce", "console", "errors", "script", "timestamp"],
        minimumMatches: 3,
      },
      {
        label: "Inspect failed or slow Network requests",
        prompt: "Record the request path, method, status, duration, response, and request identifier where available.",
        why: "Network evidence shows whether the page requested data and how the server responded.",
        signals: ["network", "xhr", "fetch", "request", "url", "endpoint", "method", "status", "duration", "response", "request id"],
        minimumMatches: 5,
      },
      {
        label: "Remove sensitive information before sharing",
        prompt: "Redact tokens, cookies, authorization headers, personal data, and account identifiers from screenshots or HAR files.",
        why: "Diagnostic evidence must not create a new security or privacy incident.",
        signals: ["remove", "redact", "token", "cookies", "authorization header", "personal data", "account identifier", "har", "screenshot"],
        minimumMatches: 4,
      },
    ],
  },
  "api-and-http-basics": {
    minimumWords: 55,
    criteria: [
      {
        label: "Explain what POST represents",
        prompt: "Explain that POST sends data for the server to create or process an order.",
        why: "The method clarifies the intended action without requiring the learner to write code.",
        signals: ["post", "create", "process", "order", "request body", "supplied body", "send data"],
        minimumMatches: 3,
      },
      {
        label: "Interpret 400 as a request clue",
        prompt: "Explain that 400 commonly indicates an invalid request, not a confirmed server defect.",
        why: "The status category guides investigation while leaving room for the actual evidence.",
        signals: ["400", "bad request", "invalid request", "malformed", "missing", "invalid value", "does not prove", "commonly"],
        minimumMatches: 3,
      },
      {
        label: "Inspect the structured request before escalating",
        prompt: "Check the endpoint, headers or content type, JSON syntax, required fields, field types, and request ID against documentation or a working request.",
        why: "A structured comparison can identify request problems before engineering must investigate.",
        signals: ["endpoint", "headers", "content type", "json", "syntax", "required fields", "field types", "request id", "documentation", "working request"],
        minimumMatches: 5,
      },
    ],
  },
  "authentication-problems": {
    minimumWords: 75,
    criteria: [
      {
        label: "Handle reset links and verification delivery safely",
        prompt: "For the expired link and missing code, check timing and the masked destination, then generate or deliver a new valid request without asking for the secret.",
        why: "These checks address link validity and delivery without exposing recovery credentials.",
        signals: ["expired link", "request time", "new link", "missing code", "masked destination", "delivery", "spam", "generate"],
        minimumMatches: 4,
      },
      {
        label: "Separate sessions from permissions",
        prompt: "Investigate session timeouts through device, browser, cookies, and timing; investigate visible-but-blocked billing through role or permission checks.",
        why: "A password reset will not fix a session configuration or authorization problem.",
        signals: ["session", "timeout", "device", "browser", "cookie", "billing", "role", "permission", "authorization"],
        minimumMatches: 5,
      },
      {
        label: "Protect authentication secrets",
        prompt: "State that passwords, one-time codes, tokens, and recovery secrets must never be requested or recorded.",
        why: "Access troubleshooting must not expose the credentials it is meant to protect.",
        signals: ["never request", "do not ask", "password", "one-time code", "otp", "token", "recovery code", "secret"],
        minimumMatches: 3,
      },
    ],
  },
  "networking-and-dns-basics": {
    minimumWords: 65,
    criteria: [
      {
        label: "Establish scope before changing anything",
        prompt: "Confirm whether the slowdown affects one user or many and record the time, location, or region.",
        why: "Scope distinguishes an individual environment problem from a wider service event.",
        signals: ["one user", "many users", "time", "region", "location", "scope", "when"],
        minimumMatches: 3,
      },
      {
        label: "Compare browser, device, and network one layer at a time",
        prompt: "Test another browser, another device on the same network, and the original device on another network.",
        why: "Controlled comparisons show whether the problem follows the browser, device, or network.",
        signals: ["browser", "device", "network", "another browser", "private window", "another device", "same network", "different network", "mobile data", "original device"],
        minimumMatches: 4,
      },
      {
        label: "Check route and service evidence",
        prompt: "Record DNS or request timing, compare another region where possible, and review service status or application metrics.",
        why: "Route and service evidence prevents the local network from being blamed without proof.",
        signals: ["dns", "resolution", "request timing", "latency", "another region", "service status", "status page", "application metrics", "monitoring"],
        minimumMatches: 3,
      },
    ],
  },
  "technical-escalations": {
    minimumWords: 90,
    criteria: [
      {
        label: "Summarize impact and environment",
        prompt: "State the export failure, customer impact, affected environment, browser, operating system, and relevant scope.",
        why: "Impact and environment help the receiving team understand urgency and where to investigate.",
        signals: ["export", "fails", "impact", "cannot complete", "month-end", "production", "chrome", "windows", "10,000", "records"],
        minimumMatches: 5,
      },
      {
        label: "Provide reproducible expected-versus-actual evidence",
        prompt: "Include exact steps, expected result, actual result, timestamps or request IDs, and sanitized technical evidence.",
        why: "Reproduction and evidence let engineering continue the investigation instead of restarting it.",
        signals: ["steps", "open reports", "expected", "actual", "spinner", "export failed", "timestamp", "request id", "console", "network", "sanitized"],
        minimumMatches: 5,
      },
      {
        label: "Document completed tests and the help requested",
        prompt: "Show the comparison tests already completed and ask engineering a precise question about the limit, failure, workaround, or fix path.",
        why: "Completed tests prevent repetition, while a clear request defines what the next team should decide.",
        signals: ["tests", "9,999", "two browsers", "two users", "reproduce", "engineering", "confirm", "size limit", "backend", "workaround", "fix path"],
        minimumMatches: 5,
      },
    ],
  },
  "customer-success-explained": {
    minimumWords: 65,
    criteria: [
      {
        label: "Define Support's responsibility",
        prompt: "Explain that Support confirms product functionality and resolves technical blockers or immediate product problems.",
        why: "Clear role boundaries prevent proactive success work from replacing issue resolution.",
        signals: ["support", "functions correctly", "technical blocker", "technical problem", "resolve", "issue", "tickets"],
        minimumMatches: 3,
      },
      {
        label: "Connect Customer Success to outcomes",
        prompt: "Explain that Customer Success investigates the intended business outcome, workflow, adoption, and measures of success.",
        why: "Customer Success is defined by progress toward outcomes, not simply by frequent contact.",
        signals: ["customer success", "business outcome", "intended outcome", "workflow", "adoption", "success measures", "value", "use case"],
        minimumMatches: 4,
      },
      {
        label: "Show how the teams coordinate",
        prompt: "Describe how Support and Customer Success share evidence and divide actions while working toward one customer result.",
        why: "Collaboration avoids duplicate work and connects technical resolution to meaningful adoption.",
        signals: ["share", "ticket history", "product evidence", "agree", "coordinate", "support removes", "success guides", "measures progress", "plan"],
        minimumMatches: 3,
      },
    ],
  },
  "customer-onboarding": {
    minimumWords: 65,
    criteria: [
      {
        label: "Define an early measurable value goal",
        prompt: "Connect organized customer emails to a measurable response-time baseline or improvement.",
        why: "A first-value goal keeps onboarding focused on a customer result instead of a product tour.",
        signals: ["first-value", "first value", "support emails", "shared inbox", "organize", "response time", "baseline", "goal"],
        minimumMatches: 3,
      },
      {
        label: "Configure and practise the essential workflow",
        prompt: "Set up the inbox, users, ownership, and priority flow, then test it with sample customer emails and coaching.",
        why: "Configuration creates access, while realistic practice builds the confidence to use it.",
        signals: ["configure", "inbox", "users", "ownership", "priority queue", "live test", "sample emails", "coach", "assign", "reply"],
        minimumMatches: 5,
      },
      {
        label: "Review evidence before adding more features",
        prompt: "After a defined period, compare captured-email and response-time results before expanding the onboarding plan.",
        why: "A measured review confirms value and prevents unnecessary feature overload.",
        signals: ["after one week", "review", "percentage", "emails captured", "response time", "measure", "next feature", "agreed outcome"],
        minimumMatches: 3,
      },
    ],
  },
  "customer-goals-and-outcomes": {
    minimumWords: 38,
    criteria: [
      {
        label: "Discover the business problem",
        prompt: "Ask what problem automation should solve and why that change matters to the team.",
        why: "The feature request becomes useful only when it connects to a meaningful problem.",
        signals: ["business problem", "what problem", "why", "solve", "matters", "goal", "outcome"],
        minimumMatches: 2,
      },
      {
        label: "Understand the workflow and people affected",
        prompt: "Ask which repeated task should change, who will use it, and what could prevent adoption.",
        why: "Workflow and stakeholder context reveal whether the proposed change is realistic.",
        signals: ["workflow", "repeated task", "change first", "who", "team", "use it", "prevent adoption", "barrier"],
        minimumMatches: 3,
      },
      {
        label: "Define observable value",
        prompt: "Ask what measurable result, such as time saved or errors reduced, would demonstrate success.",
        why: "An observable measure turns a broad expectation into a reviewable outcome.",
        signals: ["measurable", "measure", "result", "time saved", "errors reduced", "faster responses", "show", "valuable", "success"],
        minimumMatches: 3,
      },
    ],
  },
  "product-adoption": {
    minimumWords: 65,
    criteria: [
      {
        label: "Consider several distinct adoption barriers",
        prompt: "List at least five plausible barriers across value, workflow fit, setup, access, training, confidence, or habit.",
        why: "Adoption rarely improves when every inactive customer is assumed to need more training.",
        signals: ["unclear value", "workflow mismatch", "workflow fit", "difficult setup", "permissions", "missing data", "training", "confidence", "habit", "process resistance"],
        minimumMatches: 5,
      },
      {
        label: "Ask questions about the customer's actual experience",
        prompt: "Ask what task the feature should improve, what happened during recent use, where usage stopped, and what the customer uses instead.",
        why: "Experience-based questions reveal the barrier without blaming the customer.",
        signals: ["what task", "expected", "last time", "what happened", "where they stopped", "permissions", "data", "use instead", "today"],
        minimumMatches: 4,
      },
      {
        label: "Use answers to identify the barrier type",
        prompt: "Explain how the answers distinguish motivation, capability, access, workflow, confidence, or product fit.",
        why: "A diagnosis makes the next adoption action relevant instead of generic.",
        signals: ["motivation", "capability", "access", "product fit", "workflow", "confidence", "reveal", "barrier"],
        minimumMatches: 3,
      },
    ],
  },
  "customer-health-signals": {
    minimumWords: 70,
    criteria: [
      {
        label: "Separate healthy and risky signals",
        prompt: "Identify stable usage and positive feedback as encouraging while treating unresolved cases and declining attendance as risk.",
        why: "Separating signals prevents one positive metric from hiding meaningful risk.",
        signals: ["healthy", "stable usage", "positive feedback", "risk", "unresolved", "support cases", "declining", "meeting attendance"],
        minimumMatches: 5,
      },
      {
        label: "Recognize incomplete or biased evidence",
        prompt: "Explain that one user's survey response cannot represent the complete account.",
        why: "Customer health must account for who provided the signal and whose experience is missing.",
        signals: ["one user", "one viewpoint", "survey", "limited", "not enough", "does not represent", "only one"],
        minimumMatches: 2,
      },
      {
        label: "Investigate context before assigning health",
        prompt: "Check case severity and age, usage by role or feature, attendance changes, stakeholders, goals, and renewal timing before deciding.",
        why: "Context converts a dashboard snapshot into a responsible health judgment.",
        signals: ["severity", "case age", "usage by role", "usage by feature", "meetings", "stakeholder", "business goals", "renewal", "needs review", "before assigning"],
        minimumMatches: 5,
      },
    ],
  },
  "proactive-customer-communication": {
    minimumWords: 40,
    criteria: [
      {
        label: "Explain the evidence-based reason for reaching out",
        prompt: "Mention that setup is complete but the core feature has not been used for 14 days.",
        why: "A relevant trigger makes the message helpful rather than a generic check-in.",
        signals: ["setup is complete", "completed setup", "not been used", "has not been used", "14 days", "noticed", "reaching out"],
        minimumMatches: 2,
      },
      {
        label: "Connect the feature to the customer's goal",
        prompt: "Relate the unused feature to the stated goal or workflow it was meant to improve.",
        why: "Goal context explains why the feature matters without pressuring the customer to create activity.",
        signals: ["your goal", "stated goal", "reduce", "manual assignment", "routing", "workflow", "value"],
        minimumMatches: 2,
      },
      {
        label: "Offer one practical next step",
        prompt: "Suggest one specific, low-effort action such as a short working session to configure the first real workflow.",
        why: "A concrete next step makes proactive outreach immediately useful.",
        signals: ["working session", "20-minute", "20 minute", "this week", "configure", "first rule", "together", "real workflow", "would you like"],
        minimumMatches: 3,
      },
    ],
  },
  "preventing-customer-churn": {
    minimumWords: 85,
    criteria: [
      {
        label: "Investigate the underlying renewal risk",
        prompt: "Ask about the unmet outcome, declining usage, unresolved-case impact, renewal decision owner, and required improvement.",
        why: "Churn prevention begins with the real loss of value or trust, not an automatic discount.",
        signals: ["outcome", "usage", "declined", "unresolved", "cases", "daily work", "renewal", "decision", "owner", "must improve", "improve", "risk"],
        minimumMatches: 5,
      },
      {
        label: "Assign three recovery actions with owners and deadlines",
        prompt: "Give Support, Customer Success, and the account owner a concrete action and time commitment.",
        why: "Named owners and dates turn concern into an accountable recovery plan.",
        signals: ["support lead", "csm", "customer success", "account owner", "five business days", "seven days", "ten days", "within", "owner", "deadline"],
        minimumMatches: 6,
      },
      {
        label: "Define evidence of recovery",
        prompt: "State how restored usage, support outcomes, and sponsor confirmation will show whether the plan worked.",
        why: "Recovery must be measured through restored value and trust, not simply completed internal tasks.",
        signals: ["success", "restored usage", "usage", "case outcomes", "resolved", "sponsor", "confirmation", "renewal path"],
        minimumMatches: 3,
      },
    ],
  },
  "renewals-and-expansion": {
    minimumWords: 80,
    criteria: [
      {
        label: "Prepare and validate value evidence",
        prompt: "Compile adoption trends and measurable outcomes, then confirm that evidence with the customer.",
        why: "Renewal conversations are stronger when value is demonstrated and mutually recognized.",
        signals: ["adoption trends", "measurable outcomes", "outcomes achieved", "value evidence", "validate", "confirm", "customer"],
        minimumMatches: 3,
      },
      {
        label: "Address risks and missing stakeholders",
        prompt: "Create an owned plan for the integration issue and reconnect with the executive sponsor.",
        why: "Strong usage does not erase an unresolved blocker or a missing decision-maker.",
        signals: ["integration issue", "renewal risk", "owner", "workaround", "update schedule", "target resolution", "executive sponsor", "reconnect", "priorities"],
        minimumMatches: 5,
      },
      {
        label: "Plan renewal and expansion responsibly",
        prompt: "Agree on a mutual action plan and timeline, and discuss expansion only when customer goals and usage demonstrate a genuine need.",
        why: "Responsible expansion supports the customer's next outcome instead of distracting from unresolved risk.",
        signals: ["mutual action plan", "60-day", "renewal timeline", "expansion", "genuine need", "usage", "goals", "adding seats", "not as a distraction"],
        minimumMatches: 5,
      },
    ],
  },
};

export function getPracticeRubric(card) {
  return practiceRubrics[card?.id] || null;
}
