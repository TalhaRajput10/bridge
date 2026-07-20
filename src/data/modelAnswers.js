export const modelAnswers = {
  "what-customer-support-means":
    "1. When did the service stop working, and did it work normally on your previous phone?\n2. What phone did you move from and which model are you using now?\n3. What have you already tried, and what do you currently see when you attempt to connect?",

  "customer-support-mindset":
    "I understand that you've already contacted us several times about this billing issue, and I'm sorry it remains unresolved. I'll review your previous conversations first so you don't have to repeat everything. I'll then investigate what is preventing the resolution, coordinate with the appropriate team if needed, and keep you updated on the next steps until we have a clear outcome.",

  "understanding-customer-goals":
    "1. Could you share what prompted you to consider cancelling today?\n2. What outcome were you hoping to achieve when you first chose the product?\n3. Is there a particular issue or change that would be useful for us to understand before I help with your request?",

  "support-channels-explained":
    "Live chat: I can help with that. What happens when you try to sign in, and do you see an error message?\n\nEmail: Hello, I'm sorry you're having trouble signing in. Please reply with the exact error message, the email address associated with the account, and whether password reset has already been attempted. Do not send your password. Once I have those details, I'll guide you through the safest next step.",

  "active-listening":
    "Known facts: the application was updated yesterday, sign-in stopped afterward, and the customer has reset the password twice. Likely emotion: frustrated and concerned because repeated effort has not helped. I would confirm the application and device versions, then ask for the exact error message and whether sign-in works through another browser or device.",

  "asking-better-questions":
    "1. Is the verification email missing entirely, or does it arrive late?\n2. Have you checked spam, junk, promotions, and any company email quarantine?\n3. Is the email address shown on the account correct, and can it receive other messages?\n4. When was the latest code requested, and have multiple requests been made?",

  "showing-genuine-empathy":
    "I understand how disruptive a duplicate charge can be, especially when you need those funds for an urgent payment. I'll review both transactions now to confirm whether they are completed charges or a temporary authorization. Once verified, I'll explain the available refund or release process and give you the most accurate timeframe I can without promising a result before the review is complete.",

  "professional-tone":
    "It looks like the account was temporarily locked after several unsuccessful sign-in attempts. Please wait for the security lock to expire, then try again using your most recent password. If you are still unable to sign in afterward, let me know and I'll help you verify the account and choose the next safe step.",

  "positive-language":
    "Feature unavailable: That feature is not available yet, but you can achieve a similar result by using the export option.\nAnother team: Our billing specialists are best equipped to handle this. I'll route your request with the context you've already provided.\nNot today: We can begin the review today, and processing will be completed on the next business day.",

  "de-escalating-frustration":
    "You've received three incorrect orders, so I understand why you need a clear solution now. I'm sorry for the repeated disruption. I'll first review the three order records and the items originally requested so you do not have to explain everything again. I will then confirm the fastest available replacement or refund option and explain exactly what happens next.",

  "writing-clear-responses":
    "Hello, I can help you reset your password.\n\n1. Open the sign-in page and select Forgot password.\n2. Enter the email address on your account.\n3. Open the newest reset email and select its link.\n4. Create a new password and sign in again.\n\nYou should then reach your account dashboard. If the email does not arrive within ten minutes, check spam and request one new link. If it is still missing, reply here and I'll investigate delivery.",

  "closing-conversations":
    "I'm glad we confirmed that the application is working again. The issue was resolved after clearing the outdated browser data and signing in again. You can continue using the service normally. If the blank screen returns, note the time and browser you are using and reply to this conversation so we can continue the investigation without starting over.",

  "troubleshooting-mindset":
    "I would collect the device model and operating-system version, application version, image format and file size, exact crash time, and whether every photo or only certain photos cause the crash. I would then upload one small supported image and one image that previously failed on the same device. Changing only the file isolates whether the crash is linked to image data or the wider application environment.",

  "reproducing-customer-issues":
    "Starting conditions: test account with an item in the cart and an active code SAVE10, using Chrome 126 on Windows 11. Steps: open checkout, enter shipping details, apply SAVE10, and select Continue. Test data: one standard item and a valid address. Expected: discount appears and checkout continues. Actual: Continue remains disabled after the discount applies. Record console errors, network requests, timestamp, account ID, and whether the result repeats in another browser.",

  "reading-error-messages":
    "Known: the upload failed at 14:32 UTC, returned HTTP 413, and can be traced with request ID req_8472. A 413 commonly means the request body is larger than the server or gateway permits, but it does not prove the final cause. I would check the file size and type, compare it with documented limits, inspect whether a proxy has a lower limit, and use the request ID to review the corresponding logs.",

  "browser-developer-tools":
    "I would reload the dashboard with DevTools open. In Console, I would record errors, affected script names, and timestamps. In Network, I would filter failed or slow XHR/fetch requests and capture the URL path, method, status, duration, and response message. I would test once without extensions or cached data. Before escalation, I would remove tokens, cookies, authorization headers, personal data, and full account identifiers from screenshots or HAR files.",

  "api-and-http-basics":
    "POST means the client is asking the server to create or process an order using the supplied body. A 400 response usually means the server considers the request invalid, often because of malformed JSON, missing fields, invalid values, or the wrong content type. I would inspect the endpoint, headers, JSON syntax, required fields, field types, and request ID; compare the payload with the API documentation and a known working request before escalating.",

  "authentication-problems":
    "Expired reset link: confirm the link's request time and ask the user to generate one new link. Missing code: verify the masked destination and check delivery delay or spam without exposing the code. Session timeouts: confirm device, browser, cookie settings, and timeout pattern. Signed in but billing hidden: verify the user's role and required permission. I would never request passwords, one-time codes, or secret recovery data.",

  "networking-and-dns-basics":
    "First confirm whether the slowdown affects one user or many and note the time and region. Test another browser and private window, then another device on the same network. Test the original device on a different network. Record DNS resolution and request timing, compare another region if available, and check the service-status page and application metrics. This sequence separates device, browser, network, routing, and service-level causes without changing several variables at once.",

  "technical-escalations":
    "Summary: dashboard exports fail when a report exceeds 10,000 records. Impact: the customer cannot complete month-end reporting. Environment: production account, Chrome 126, Windows 11. Steps: open Reports, select 10,001+ records, choose CSV, and export. Expected: download begins. Actual: spinner ends with Export failed. Evidence: timestamp, request ID, console error, and sanitized network response attached. Tests: 9,999 records succeeds; two browsers and two users reproduce. Engineering help requested: confirm size limit or backend failure and advise a workaround and fix path.",

  "customer-success-explained":
    "Support should confirm that the product functions correctly and resolve any technical blockers. Customer Success should investigate the customer's intended business outcome, current workflow, adoption level, success measures, and whether the configured use case can deliver the expected value. The teams can share ticket history and product evidence, agree on the main blocker, and coordinate a plan in which Support removes defects while Customer Success guides adoption and measures progress.",

  "customer-onboarding":
    "1. Define the first-value goal: route all support emails into one shared inbox and establish a baseline response time.\n2. Configure the inbox, users, ownership rules, and one priority queue.\n3. Run a live test with five sample emails and coach the team through assigning and replying.\n4. After one week, review the percentage of emails captured and the change in first-response time, then introduce the next feature only if it supports the agreed outcome.",

  "customer-goals-and-outcomes":
    "1. What business problem should automation solve for the team?\n2. Which workflow or repeated task should change first?\n3. Who needs to use it, and what might prevent adoption?\n4. What measurable result—time saved, errors reduced, faster responses, or another outcome—would show that the rollout is valuable?",

  "product-adoption":
    "Possible barriers are unclear value, a workflow mismatch, difficult setup, missing permissions or data, and insufficient confidence after training. I would ask what task they originally expected the report to improve, what happened the last time they used it, where they stopped, whether the right data and permissions are available, and what they use instead today. Their answers reveal whether the gap is motivation, capability, access, or product fit.",

  "customer-health-signals":
    "Healthy signals: stable usage and positive feedback from one user. Risk signals: two unresolved cases and declining meeting attendance; the survey represents only one viewpoint. Before assigning health, I would investigate case severity and age, usage by role and feature, the reason meetings declined, stakeholder changes, progress toward business goals, and renewal timing. I would mark the account as needing review rather than healthy until the unresolved issues and stakeholder engagement are understood.",

  "proactive-customer-communication":
    "Hi Sara, I noticed your setup is complete, but the shared-inbox automation has not been used during the last 14 days. Since your goal was to reduce manual assignment time, activating one routing rule could help your team see value quickly. Would you like a 20-minute working session this week to configure the first rule together using one real workflow?",

  "preventing-customer-churn":
    "I would ask which outcome is no longer being achieved, why usage declined, how the unresolved cases affect daily work, who owns the renewal decision, and what must improve before renewal. Recovery plan: Support lead resolves or workarounds the three cases within five business days; CSM runs a goal and adoption review within seven days; account owner presents a documented recovery plan and weekly updates to the sponsor within ten days. Success is restored usage, agreed case outcomes, and sponsor confirmation of the renewal path.",

  "renewals-and-expansion":
    "Compile adoption trends and two measurable outcomes achieved, then validate them with the customer. Treat the integration issue as a renewal risk: assign an owner, workaround, update schedule, and target resolution. Reconnect with the executive sponsor to confirm priorities and value. Agree on a 60-day mutual action plan and renewal timeline. Explore expansion only where usage and goals show a genuine need—for example, adding seats for an active team—not as a distraction from the unresolved integration.",

  "how-support-operations-works":
    "Example: refund request. It enters through chat or email and becomes a ticket tagged Billing > Refund. The frontline agent owns acknowledgment and validation, requiring account, order, reason, amount, payment status, and policy eligibility. Escalate exceptions, fraud indicators, or amounts above authority to Billing. Resolve when the decision and transaction reference are confirmed; record the reason, approval, amount, timeframe, customer communication, and any recurring cause for reporting.",

  "ticket-lifecycle-and-routing":
    "A password-reset request enters through chat, email, or self-service. Triage captures account email, exact symptom, delivery status, recent attempts, and security flags. Frontline Support owns it with statuses New, Investigating, Waiting for Customer, Escalated, and Resolved. Escalate suspected compromise, delivery-system failure, or repeated valid-link failure. Resolution means safe access is restored or a verified alternative is provided. Close only after confirmation or the documented no-response period, without storing passwords or codes.",

  "slas-and-prioritization":
    "1. All customers have delayed payments: highest priority because of broad financial impact, even with a workaround.\n2. Fifty users cannot log in: high priority due to significant access loss.\n3. Administrator needs tomorrow's report: medium priority with a clear deadline and planning window.\n4. One user cannot update a profile: normal priority unless it blocks a critical outcome. I would also consider security, contractual SLAs, affected revenue, and whether each workaround is safe and sustainable.",

  "support-metrics-that-matter":
    "Faster first responses alongside a growing backlog, lower CSAT, and more reopened tickets may mean the team is replying quickly but not resolving thoroughly. I would segment by channel, issue type, agent, and period; compare first-response and resolution time; inspect reopen reasons and QA samples; check staffing and ticket complexity; and ask whether automation changed. I would not simply slow responses—I would find where quality or capacity is breaking and test a focused correction.",

  "quality-assurance-in-support":
    "1. Acknowledgment: recognizes the history and impact; critical error is dismissing or blaming the customer.\n2. Accuracy: gives policy- and product-correct information; critical error is a harmful false promise.\n3. Investigation: confirms key facts before deciding; critical error is exposing or requesting secret data.\n4. Resolution: provides a complete, actionable next step and expectation.\n5. Clarity and tone: concise, calm, and easy to follow. Any privacy breach, abusive language, or unauthorized financial action is an automatic critical error.",

  "knowledge-management-and-documentation":
    "Title: Customer cannot receive a password-reset email. Prerequisites: verified account address, access to approved delivery tools, and no request for passwords or codes. Diagnostics: confirm destination, latest request time, spam/quarantine, resend limits, delivery event, suppression status, and service health. Expected: newest email arrives within the documented window. Common causes: typo, filtering, rate limit, suppression, or outage. Escalate confirmed delivery failures with sanitized evidence. Keywords: reset, email, verification, delivery. Owner: Support Operations. Review: 90 days or after any workflow change.",

  "workflow-automation":
    "Trigger: new ticket contains a recognized payment-failure code. Conditions: verified code, payment topic, supported language, and no fraud or account-security flag. Actions: apply category and priority, attach the approved diagnostic checklist, and route to Payments. Exclude refunds, chargebacks, VIP exceptions, and uncertain matches. Low-confidence cases stay with general triage. Support Operations owns it. Test true, false, duplicate, multilingual, and security cases. Monitor routing accuracy, reassignment rate, handling time, and missed critical cases weekly.",

  "continuous-support-improvement":
    "Problem: customers repeatedly contact Support to find invoices. Evidence: contact volume, search terms, ticket tags, page analytics, customer wording, and handling time. Likely causes include unclear navigation, weak labels, or missing help content. Test one change: add a clearly labelled View invoices link on the billing page and update search results. Product owns the UI change; Support Operations measures it. Success: a 25% reduction in invoice-location contacts over four weeks without increasing billing errors. Watch for clutter, misclicks, and permission exposure.",

  "understanding-the-customer-journey":
    "For a project-management subscription: Discovery—question: will it fit our workflow; frustration: unclear comparison; support reduces effort with honest use-case guidance. Trial—how do we import tasks; frustration: setup complexity; provide a quick-start path. Activation—how do we invite teammates; frustration: permissions; explain roles. Adoption—how do we automate updates; frustration: low team usage; connect features to goals. Renewal—is it worth the cost; frustration: unclear value; summarize outcomes, risks, and next steps before renewal.",

  "support-roles-and-career-paths":
    "Customer Support: goal—resolve customer needs; tasks—answer tickets and explain workflows; develop written communication. Technical Support: goal—diagnose product or integration issues; tasks—reproduce errors and inspect logs; develop troubleshooting. Customer Success: goal—help customers achieve outcomes; tasks—onboarding and adoption reviews; develop business discovery. Support Operations: goal—make support systems effective; tasks—manage workflows and analyze metrics; develop process and data analysis.",

  "support-terminology-and-workflows":
    "Ticket: the recorded support request. SLA: the agreed response or resolution target. Escalation: moving an issue to the right person or level when defined conditions are met. Workaround: a safe temporary path that reduces impact. Root cause: the underlying reason the issue occurred. Backlog: unresolved work waiting for action. CSAT: customer feedback about an interaction. To a new colleague: an SLA is our promised response target; a workaround keeps the customer moving while the main issue is fixed; a backlog is the work still waiting to be completed.",

  "building-your-support-learning-plan":
    "Troubleshooting: twice weekly, reproduce one sample issue and create an investigation note; ask a technical peer for feedback; review after four weeks. Professional writing: rewrite three support replies each week and save before-and-after examples; request QA feedback; review every Friday. Interviewing: record two STAR answers weekly and track length and clarity; ask a mentor to score them; conduct a full mock interview on the final Saturday.",

  "choosing-your-target-support-role":
    "After reviewing three Product Support roles, recurring responsibilities were troubleshooting, customer communication, reproducing defects, writing escalations, and maintaining documentation. Common skills/tools were SaaS knowledge, Zendesk, Jira, browser DevTools, APIs, and clear writing. I already demonstrate customer communication and structured troubleshooting through my current work and BRIDGE portfolio. My gaps are deeper API investigation and Jira workflow experience; I will complete two API projects and document a simulated bug-to-escalation workflow this month.",

  "writing-a-support-resume":
    "Resolved complex activation and connectivity cases across chat, email, and voice by applying structured diagnostics and coordinating escalations, helping customers restore service with clear next steps.\n\nBuilt BRIDGE, a React and Vite learning platform containing 64 practical customer-support Journey Cards across eight collections, deployed through GitHub and Cloudflare.\n\nReviewed recurring support questions and converted them into reusable troubleshooting notes, improving consistency and reducing repeated investigation for the team.",

  "building-a-support-portfolio":
    "Scenario: a SaaS customer receives 401 errors after connecting an integration. Artifact 1—customer response: acknowledge impact, request the sanitized endpoint, timestamp, and authentication method, and provide safe checks. Artifact 2—investigation note: environment, reproduction steps, request/response metadata, tests, and hypotheses. Artifact 3—escalation: concise impact, evidence, ruled-out causes, request ID, workaround, and exact engineering question. Together, the artifacts demonstrate communication, investigation, and documentation.",

  "optimizing-linkedin-for-support":
    "Headline: Product Experience Analyst | Customer Success & SaaS Support | Technical Troubleshooting | Builder of BRIDGE, a Practical Support Learning Platform\n\nAbout: I help customers turn product problems into clear next steps through calm communication, structured troubleshooting, and cross-team ownership. At US Mobile, I support activations, technical cases, onboarding, and product questions across chat, email, and voice. I also built BRIDGE, a React-based platform with 64 practical Journey Cards for early-career support professionals. I am currently deepening my skills in APIs, support operations, AI workflows, and customer-success strategy.",

  "finding-and-evaluating-support-jobs":
    "Tracker columns: Company | Role | Link | Date | Fit | Resume | Contact | Status | Follow-up | Notes. Example rows: Acme—Product Support Specialist—strong troubleshooting fit—verify night-shift requirement; Northstar—Customer Success Associate—onboarding experience fits—verify portfolio size; Orbit—Technical Support Representative—SaaS and API learning fit—verify required SQL depth. Each row uses a role-specific resume version and a follow-up date five business days after application.",

  "writing-targeted-applications":
    "Your team needs a Product Support Specialist who can translate technical problems into calm, useful customer guidance while giving Engineering actionable evidence. That combination closely matches the work I most enjoy.\n\nIn my current role, I investigate activation and connectivity issues across chat, email, and voice, coordinate complex cases, and keep customers informed. I also built BRIDGE, a React learning platform that turns support concepts into 64 practical exercises.\n\nI am especially interested in your workflow product because reliable collaboration depends on both technical clarity and customer trust. I would welcome the opportunity to bring that ownership to your support team.",

  "mastering-support-interviews":
    "My story bank contains six two-minute STAR outlines. Difficult person: calmed a frustrated customer and agreed on next steps. Mistake: corrected incomplete guidance and added a verification habit. Priorities: triaged simultaneous cases by impact and SLA. Fast learning: learned a new activation workflow and documented it. Problem solving: isolated a device-versus-network issue through controlled tests. Process improvement: converted a recurring question into reusable documentation. Each story includes a specific situation, my action, a truthful result, and what I learned.",

  "evaluating-offers-and-first-90-days":
    "Verify salary, currency, payment schedule, employment type, probation, hours and time zone, leave, benefits, equipment, performance measures, and notice terms. First 30 days: learn the product, tools, policies, top issue types, and key teammates; request weekly feedback. By day 60: independently handle the agreed ticket scope while meeting quality and documentation expectations. By day 90: consistently meet core measures, build trusted cross-team relationships, and propose one evidence-based improvement without disrupting the existing workflow.",

  "ai-in-modern-customer-support":
    "AI may summarize the complaint, classify the topic, retrieve approved policy, and draft a response. A human must verify the charges, interpret exceptions, choose any financial action, handle emotion, and remain accountable. Verify transaction status, dates, amount, prior contacts, policy eligibility, and customer identity through approved systems. Escalate suspected fraud, vulnerable-customer concerns, threats, legal language, policy exceptions, high-value adjustments, or any case where the evidence and AI draft conflict.",

  "prompting-for-support-work":
    "Draft a response to a customer whose order was due Tuesday and is now expected Friday. Verified facts: order 4821 is in transit; carrier delay confirmed; refund is not yet eligible. Approved options: provide tracking and offer free expedited shipping on the next order. Tone: calm and accountable. Length: under 130 words. Structure: acknowledgment, verified update, options, next step. Do not promise Friday delivery or blame the carrier. After the draft, list any missing information separately and do not invent it.",

  "reviewing-ai-generated-responses":
    "1. Facts—do amounts, dates, and status match the source system? 2. Policy—is the refund option authorized? 3. Goal—does it address what the customer actually wants? 4. Tone—does it acknowledge impact without sounding scripted? 5. Privacy—does it avoid unnecessary personal data? 6. Actionability—are the next steps and timeframe clear? 7. Uncertainty—are unknowns labelled rather than invented? I would correct any failure before sending and require human approval for the financial decision.",

  "privacy-and-security-with-ai":
    "Remove or replace the customer's name, email, account ID, API token, and all payment details. The API token must never be entered, even partially; revoke it if exposure is suspected. Replace identifiers with placeholders such as CUSTOMER_A and ACCOUNT_1. Keep only the minimum technical context: a non-identifying error code and product version, if both are permitted by policy. Use only an approved AI tool, confirm retention settings, and have a person review the sanitized input before submission.",

  "ai-for-ticket-summaries-and-handoffs":
    "Prompt: Using only the verified notes below, create a factual handoff. Separate facts from hypotheses, preserve timestamps, do not add causes, and flag missing fields. Output: Impact; Environment; Verified facts; Evidence and request IDs; Steps attempted and exact results; Current hypotheses; Customer expectation; Current owner; Blocker; Next action, owner, and due time. Before sharing, compare every statement with the ticket, remove sensitive data, and have the current owner approve the summary.",

  "ai-assisted-knowledge-management":
    "Select a representative, sanitized set of recent password-reset tickets plus current product and policy documentation. AI clusters causes, proposes an outline, and drafts plain-language steps. A support expert verifies every step, Security reviews identity and privacy guidance, and the article is tested by someone unfamiliar with the workflow. The content owner approves and publishes it with keywords and escalation criteria. Track search success, ticket deflection, and incorrect-use reports; review after 30 days and quarterly thereafter.",

  "ai-automation-and-human-handoffs":
    "Require a human for suspected fraud, account compromise, disputed high-value charges, policy exceptions, vulnerable customers, and two failed AI attempts. Transfer the verified facts, conversation summary, authentication status, actions tried, customer sentiment, and reason for handoff—never secret credentials. Message: I'm connecting you with a billing specialist who can review this securely. You won't need to repeat the information already provided. Route to Billing Priority. Measure handoff accuracy, time to human response, repeat explanation, resolution rate, and post-handoff CSAT.",

  "measuring-ai-support-quality":
    "Score each reviewed case for factual accuracy, policy compliance, privacy, customer effort, resolution, repeat contact, appropriate escalation, CSAT, and handling efficiency. Accuracy, policy, and privacy are safety gates rather than averages. I would immediately pause the workflow for exposed sensitive data, unauthorized financial action, or repeated invented facts. I would roll back when critical-error rate exceeds the agreed threshold or resolution falls while repeat contacts rise, then investigate before reactivation.",

  "managing-your-support-workday":
    "Start: review outages, SLA-risk tickets, promised updates, handoffs, and priority queues; plan two focused investigation blocks. Mid-shift: reassess aging work, send due updates, document completed tests, take a proper break, and ask for help before an SLA is at risk. End: resolve or accurately status every owned case, record evidence and next actions, send promised communications, hand off urgent work with owner and deadline, and note one learning item for tomorrow.",

  "receiving-and-using-feedback":
    "Feedback: my escalations contain too much history and hide the engineering question. I would request two examples and the escalation standard, then identify which sections caused delay. The behavior to change is leading with impact, reproduction, evidence, and the exact help needed. I will rewrite three past escalations using the template and ask a senior teammate to review them. Progress means the reviewer can identify the issue and requested decision in under one minute. Follow-up: two weeks.",

  "collaborating-across-teams":
    "Engineering request: CSV exports fail for reports above 10,000 rows, blocking month-end work for four customers. Scope: production, multiple accounts, Chrome and Edge. Reproduction: Reports > select 10,001+ rows > Export CSV. Expected: download starts. Actual: export fails after roughly 30 seconds. Evidence: sanitized request IDs, timestamps, and network responses attached. Tests: smaller reports succeed; cache and browser changes do not help. Urgency: high before Friday close. Please confirm whether a backend limit is intended and advise a safe workaround or fix owner.",

  "learning-products-and-tools-quickly":
    "Workflow: invite a teammate. Goal: give the right person product access. Prerequisites: active account, available seat, and admin permission. Roles: administrator invites; teammate accepts. Normal steps: open Team, choose Invite, enter email and role, send, then accept. Expected: active member appears with correct permissions. Common failures: duplicate user, expired invitation, email filtering, no seat, or insufficient permission. Evidence: role, status, timestamp, sanitized delivery event, and error text. Trusted sources: product guide and admin policy. Escalate reproducible backend or delivery failures with request IDs.",

  "mentoring-and-peer-support":
    "Questions: What should the reader understand first? Which sentence contains the action? Where might a customer hesitate? What can be removed without losing accuracy? How would you structure this for mobile reading? I would demonstrate rewriting one response into acknowledgment, answer, numbered steps, and expectation. Practice task: rewrite two real anonymized replies and explain each edit. Follow up in one week by reviewing a new response together, then let the colleague self-score before I add feedback.",

  "leading-without-a-title":
    "Problem: password-reset tickets are repeatedly reassigned. Evidence: 18% reassignment rate, longer resolution time, and agent comments showing unclear ownership. Impact: customers wait and teams duplicate work. Support Operations owns routing; frontline agents and Identity Support are affected. Low-risk step: test a one-page routing guide and clarified tags with one shift for two weeks. Success: lower reassignment without more incorrect routing. I will share the data, invite both teams to shape the test, credit contributors, and publish the result—including what did not work.",

  "building-a-career-development-plan":
    "Target role: Technical Support Specialist. Competencies: customer communication—strong evidence; structured troubleshooting—developing; APIs—basic project evidence; browser DevTools—developing; technical escalation—strong simulated examples. Priority gaps are API investigation and live diagnostic depth. Over six months I will complete two API labs, analyze one browser case weekly, write four reviewed escalations, and shadow a technical teammate. A mentor and team lead will provide feedback. Monthly reviews will compare artifacts against real job descriptions and adjust the plan.",

  "sustainable-performance-and-wellbeing":
    "Warning signs: rushing replies, rereading without absorbing, irritability, skipping notes, and carrying one difficult case into the next. Daily recovery: scheduled breaks, water, a short walk, and a two-minute reset after intense conversations. Boundaries: pause before replying, use approved de-escalation language, and escalate abuse rather than absorbing it. Support channels: team lead, peer, wellbeing resource, and documented incident route. My early action is to tell my lead when two warning signs persist and temporarily rebalance complex work before quality declines.",
};
