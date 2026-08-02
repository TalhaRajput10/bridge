import { isSupabaseConfigured, supabase } from "./supabase.js";

const SESSION_KEY = "bridge-session-id";

function getSessionId() {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;

    const generated = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, generated);
    return generated;
  } catch {
    return null;
  }
}

export async function trackEvent(eventName, properties = {}) {
  if (!isSupabaseConfigured || !supabase || !eventName) return;

  const payload = {
    event_name: eventName,
    route: window.location.pathname,
    session_id: getSessionId(),
    properties,
  };

  try {
    const { error } = await supabase.from("product_events").insert(payload);
    if (error && import.meta.env.DEV) {
      console.warn("BRIDGE telemetry is unavailable:", error.message);
    }
  } catch (error) {
    if (import.meta.env.DEV) console.warn("BRIDGE telemetry failed:", error);
  }
}

export function captureAppError(error, context = {}) {
  const normalizedError = error instanceof Error ? error : new Error(String(error));
  return trackEvent("app_error", {
    message: normalizedError.message.slice(0, 500),
    source: context.source || "application",
    componentStack: context.componentStack?.slice(0, 1500) || null,
  });
}
