const rubrics = {
  foundations: [
    {
      label: "Understand the customer's situation or goal",
      prompt: "Clarify what happened and what the customer is trying to achieve.",
      keywords: ["understand", "goal", "need", "want", "what", "when", "changed", "confirm", "clarify", "context"],
    },
    {
      label: "Show ownership and care",
      prompt: "Acknowledge the customer and show that you will guide the issue forward.",
      keywords: ["acknowledg", "understand", "sorry", "help", "ownership", "responsib", "guide", "frustrat"],
    },
    {
      label: "Choose a thoughtful next step",
      prompt: "Explain the first useful action you would take instead of making an assumption.",
      keywords: ["first", "next", "ask", "check", "review", "investigat", "verify", "then", "before"],
    },
  ],
  "customer-communication": [
    {
      label: "Acknowledge the customer's experience",
      prompt: "Open with empathy or recognition of what the customer is experiencing.",
      keywords: ["understand", "acknowledg", "sorry", "frustrat", "appreciate", "thank", "concern"],
    },
    {
      label: "Use clear, positive language",
      prompt: "Keep the response calm, direct, and focused on what can be done.",
      keywords: ["can", "will", "help", "clear", "here's", "let's", "happy", "available"],
    },
    {
      label: "Set an expectation or next step",
      prompt: "Tell the customer what happens next and when appropriate.",
      keywords: ["next", "first", "then", "update", "within", "expect", "follow", "confirm", "step"],
    },
  ],
  "technical-support": [
    {
      label: "Gather evidence before diagnosing",
      prompt: "Ask for symptoms, changes, error details, or steps already attempted.",
      keywords: ["error", "detail", "when", "changed", "tried", "log", "screenshot", "version", "device", "reproduce"],
    },
    {
      label: "Isolate or test the likely cause",
      prompt: "Describe a focused check or test that narrows down the cause.",
      keywords: ["check", "test", "verify", "isolate", "compare", "inspect", "network", "browser", "request", "response"],
    },
    {
      label: "Verify the outcome",
      prompt: "Confirm whether the fix worked and define the escalation path if it did not.",
      keywords: ["confirm", "resolved", "works", "verify", "retry", "monitor", "escalat", "follow", "result"],
    },
  ],
  "customer-success": [
    {
      label: "Connect to the customer's desired outcome",
      prompt: "State the business or user outcome the customer wants to achieve.",
      keywords: ["goal", "outcome", "value", "need", "success", "objective", "use case", "achieve"],
    },
    {
      label: "Recommend a proactive action",
      prompt: "Suggest a practical adoption, onboarding, or retention action.",
      keywords: ["recommend", "plan", "onboard", "adopt", "train", "guide", "proactive", "next", "action"],
    },
    {
      label: "Measure and follow up",
      prompt: "Explain how you would track progress and follow up with the customer.",
      keywords: ["measure", "track", "follow", "check in", "review", "metric", "usage", "update", "monitor"],
    },
  ],
  "support-operations": [
    {
      label: "Use evidence or an operational signal",
      prompt: "Reference the relevant workflow, data, SLA, KPI, or quality signal.",
      keywords: ["data", "metric", "sla", "kpi", "ticket", "trend", "quality", "evidence", "volume", "time"],
    },
    {
      label: "Improve the process, not just the symptom",
      prompt: "Identify a workflow, documentation, or automation improvement.",
      keywords: ["process", "workflow", "document", "automate", "improve", "root cause", "knowledge", "standard", "prevent"],
    },
    {
      label: "Define ownership and measurement",
      prompt: "Name who acts next and how success will be measured.",
      keywords: ["owner", "team", "responsib", "measure", "target", "review", "follow", "monitor", "success"],
    },
  ],
  "ai-in-support": [
    {
      label: "Give the AI clear context and a task",
      prompt: "Define the situation, desired output, and important constraints.",
      keywords: ["context", "task", "goal", "customer", "tone", "format", "constraint", "prompt", "example"],
    },
    {
      label: "Verify the output",
      prompt: "Describe how a person will review facts, tone, and accuracy.",
      keywords: ["verify", "review", "check", "accurate", "fact", "edit", "human", "validate", "source"],
    },
    {
      label: "Protect customer data",
      prompt: "Avoid exposing sensitive information and keep human accountability.",
      keywords: ["privacy", "private", "personal", "sensitive", "secure", "redact", "consent", "data", "human"],
    },
  ],
  "career-hub": [
    {
      label: "Make the response relevant to the role",
      prompt: "Connect your answer to the role, company, or customer-support skill being assessed.",
      keywords: ["role", "company", "customer", "support", "skill", "job", "team", "position"],
    },
    {
      label: "Use a specific example or evidence",
      prompt: "Include a concrete situation, action, project, skill, or measurable result.",
      keywords: ["example", "result", "improved", "built", "handled", "achieved", "experience", "project", "percent"],
    },
    {
      label: "Communicate a clear next step",
      prompt: "End with a confident action, learning plan, or reason you are ready.",
      keywords: ["next", "ready", "learn", "apply", "develop", "plan", "contribute", "interview", "follow"],
    },
  ],
  "professional-growth": [
    {
      label: "Identify the development goal",
      prompt: "Name the skill, habit, or responsibility you want to improve.",
      keywords: ["goal", "improve", "develop", "learn", "skill", "growth", "habit", "strength"],
    },
    {
      label: "Define a practical action",
      prompt: "Describe a specific action you will take rather than a general intention.",
      keywords: ["practice", "create", "schedule", "ask", "review", "track", "complete", "action", "plan"],
    },
    {
      label: "Set a way to review progress",
      prompt: "Add a timeline, measure, feedback loop, or reflection point.",
      keywords: ["week", "month", "daily", "measure", "feedback", "review", "track", "progress", "deadline"],
    },
  ],
};

const fallbackRubric = rubrics.foundations;

function normalizeText(value) {
  return value.toLowerCase().replace(/[’']/g, "'");
}

export function evaluatePracticeResponse(answer, card) {
  const cleanedAnswer = answer.trim();
  const normalizedAnswer = normalizeText(cleanedAnswer);
  const criteria = rubrics[card.collectionId] || fallbackRubric;
  const covered = criteria.filter((criterion) =>
    criterion.keywords.some((keyword) => normalizedAnswer.includes(keyword)),
  );
  const missing = criteria.filter((criterion) => !covered.includes(criterion));
  const wordCount = cleanedAnswer.split(/\s+/).filter(Boolean).length;
  const coverageRatio = covered.length / criteria.length;

  let title = "Keep developing your response";
  let summary =
    "You have made a start. Add more detail and make your reasoning visible so a hiring manager or team lead can follow your approach.";

  if (coverageRatio === 1 && wordCount >= 35) {
    title = "Strong, well-rounded response";
    summary =
      "Your response covers the main ideas and gives enough detail to show how you would approach the situation.";
  } else if (coverageRatio >= 2 / 3 || (coverageRatio >= 1 / 3 && wordCount >= 30)) {
    title = "Good foundation";
    summary =
      "Your direction is sound. Strengthen the missing area below to make the response clearer and more complete.";
  }

  if (wordCount < 15) {
    summary =
      "Your answer is quite brief. Expand it by explaining what you would do, why you would do it, and what should happen next.";
  }

  return {
    title,
    summary,
    covered: covered.map((criterion) => criterion.label),
    missing: missing.map((criterion) => criterion.label),
    structure: criteria.map((criterion) => criterion.prompt),
    total: criteria.length,
  };
}
