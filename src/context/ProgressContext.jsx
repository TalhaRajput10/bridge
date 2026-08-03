import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { journeyCards } from "../data/journeyCards.js";
import { isSupabaseConfigured, supabase } from "../lib/supabase.js";
import { useAuth } from "./AuthContext.jsx";

const ProgressContext = createContext(null);
const SNAPSHOT_KEY = "bridge-progress-v1";
const LEGACY_TIMESTAMP = "1970-01-01T00:00:00.000Z";

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function emptyProgress() {
  return {
    version: 1,
    completed: {},
    answers: {},
    confidence: {},
    feedback: {},
    activityDates: [],
  };
}

function normalizeProgress(value) {
  const base = emptyProgress();
  if (!value || typeof value !== "object") return base;

  return {
    ...base,
    ...value,
    completed: value.completed || {},
    answers: value.answers || {},
    confidence: value.confidence || {},
    feedback: value.feedback || {},
    activityDates: Array.isArray(value.activityDates) ? value.activityDates : [],
  };
}

function readLegacyProgress() {
  const progress = emptyProgress();

  for (const card of journeyCards) {
    const completed = localStorage.getItem(`bridge-completed-${card.id}`);
    const answer = localStorage.getItem(`bridge-answer-${card.id}`);
    const confidence = localStorage.getItem(`bridge-stretch-confidence-${card.id}`);
    const feedbackValue = localStorage.getItem(`bridge-card-feedback-${card.id}`);

    if (completed !== null) {
      progress.completed[card.id] = {
        value: completed === "true",
        updatedAt: LEGACY_TIMESTAMP,
      };
    }

    if (answer) {
      progress.answers[card.id] = { value: answer, updatedAt: LEGACY_TIMESTAMP };
    }

    if (confidence) {
      progress.confidence[card.id] = {
        value: confidence,
        updatedAt: LEGACY_TIMESTAMP,
      };
    }

    if (feedbackValue) {
      try {
        const feedback = JSON.parse(feedbackValue);
        progress.feedback[card.id] = {
          value: feedback,
          updatedAt: feedback.updatedAt || LEGACY_TIMESTAMP,
        };
      } catch {
        // Ignore a malformed legacy entry and preserve the rest of the learner's progress.
      }
    }
  }

  return progress;
}

function readLocalProgress() {
  try {
    const saved = localStorage.getItem(SNAPSHOT_KEY);
    if (saved) return normalizeProgress(JSON.parse(saved));
  } catch {
    // Fall back to the legacy keys when the consolidated snapshot is unavailable.
  }

  return readLegacyProgress();
}

function entryTime(entry) {
  const time = Date.parse(entry?.updatedAt || LEGACY_TIMESTAMP);
  return Number.isNaN(time) ? 0 : time;
}

function mergeEntryMaps(remoteMap = {}, localMap = {}) {
  const merged = {};
  const keys = new Set([...Object.keys(remoteMap), ...Object.keys(localMap)]);

  for (const key of keys) {
    const remoteEntry = remoteMap[key];
    const localEntry = localMap[key];

    if (!remoteEntry) merged[key] = localEntry;
    else if (!localEntry) merged[key] = remoteEntry;
    else merged[key] = entryTime(localEntry) > entryTime(remoteEntry)
      ? localEntry
      : remoteEntry;
  }

  return merged;
}

function mergeProgress(remoteValue, localValue) {
  const remote = normalizeProgress(remoteValue);
  const local = normalizeProgress(localValue);

  return {
    version: 1,
    completed: mergeEntryMaps(remote.completed, local.completed),
    answers: mergeEntryMaps(remote.answers, local.answers),
    confidence: mergeEntryMaps(remote.confidence, local.confidence),
    feedback: mergeEntryMaps(remote.feedback, local.feedback),
    activityDates: [...new Set([
      ...remote.activityDates,
      ...local.activityDates,
    ])].sort().slice(-120),
  };
}

function calculateStreak(activityDates) {
  const completedDays = new Set(activityDates);
  const cursor = new Date();
  let count = 0;

  while (completedDays.has(localDateKey(cursor))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return count;
}

export function ProgressProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState(readLocalProgress);
  const [hydratedUserId, setHydratedUserId] = useState(null);
  const [syncStatus, setSyncStatus] = useState("local");

  useEffect(() => {
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (authLoading) return undefined;

    if (!user || !isSupabaseConfigured || !supabase) {
      const timer = window.setTimeout(() => {
        setHydratedUserId(null);
        setSyncStatus("local");
      }, 0);
      return () => window.clearTimeout(timer);
    }

    let cancelled = false;

    async function loadCloudProgress() {
      const { data, error } = await supabase
        .from("learning_progress")
        .select("progress")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load cloud progress:", error.message);
        setSyncStatus("error");
        return;
      }

      setProgress((current) => mergeProgress(data?.progress, current));
      setHydratedUserId(user.id);
      setSyncStatus("pending");
    }

    const timer = window.setTimeout(() => {
      setSyncStatus("loading");
      loadCloudProgress();
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [authLoading, user]);

  useEffect(() => {
    if (!user || hydratedUserId !== user.id || !supabase) return undefined;

    const timer = window.setTimeout(async () => {
      setSyncStatus("syncing");
      const { error } = await supabase.from("learning_progress").upsert({
        user_id: user.id,
        progress,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });

      if (error) {
        console.error("Unable to save cloud progress:", error.message);
        setSyncStatus("error");
      } else {
        setSyncStatus("synced");
      }
    }, 700);

    return () => window.clearTimeout(timer);
  }, [hydratedUserId, progress, user]);

  const updateEntry = useCallback((section, cardId, value) => {
    const updatedAt = new Date().toISOString();
    setSyncStatus(user ? "pending" : "local");
    setProgress((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [cardId]: { value, updatedAt },
      },
      activityDates: [...new Set([...current.activityDates, localDateKey()])]
        .sort()
        .slice(-120),
    }));
  }, [user]);

  const setCardCompletion = useCallback((cardId, value) => {
    localStorage.setItem(`bridge-completed-${cardId}`, String(value));
    updateEntry("completed", cardId, value);
  }, [updateEntry]);

  const savePracticeAnswer = useCallback(async (cardId, value) => {
    localStorage.setItem(`bridge-answer-${cardId}`, value);
    updateEntry("answers", cardId, value);

    if (!user || !isSupabaseConfigured || !supabase) {
      return { location: "device", error: null };
    }

    const card = journeyCards.find((item) => item.id === cardId);
    const { error } = await supabase.from("practice_responses").upsert({
      user_id: user.id,
      card_id: cardId,
      collection_id: card?.collectionId || "unknown",
      card_title: card?.title || cardId,
      answer: value,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,card_id" });

    if (error) {
      console.error("Unable to save the Practice Lab response:", error.message);
      setSyncStatus("error");
      return { location: "device", error };
    }

    setSyncStatus("synced");
    return { location: "account", error: null };
  }, [updateEntry, user]);

  const saveStretchConfidence = useCallback((cardId, value) => {
    localStorage.setItem(`bridge-stretch-confidence-${cardId}`, value);
    updateEntry("confidence", cardId, value);
  }, [updateEntry]);

  const saveCardFeedback = useCallback(async (cardId, value) => {
    localStorage.setItem(`bridge-card-feedback-${cardId}`, JSON.stringify(value));
    updateEntry("feedback", cardId, value);

    if (!user || !isSupabaseConfigured || !supabase) {
      return { location: "device", error: null };
    }

    const card = journeyCards.find((item) => item.id === cardId);
    const { error } = await supabase.from("card_feedback").upsert({
      user_id: user.id,
      card_id: cardId,
      collection_id: card?.collectionId || "unknown",
      card_title: card?.title || cardId,
      rating: value.rating,
      reason: value.reason || null,
      note: value.note || null,
      updated_at: value.updatedAt || new Date().toISOString(),
    }, { onConflict: "user_id,card_id" });

    if (error) {
      console.error("Unable to save Journey Card feedback:", error.message);
      setSyncStatus("error");
      return { location: "device", error };
    }

    setSyncStatus("synced");
    return { location: "account", error: null };
  }, [updateEntry, user]);

  const value = useMemo(() => {
    const completedIds = new Set(
      Object.entries(progress.completed)
        .filter(([, entry]) => entry?.value === true)
        .map(([cardId]) => cardId),
    );

    return {
      isCardComplete: (cardId) => completedIds.has(cardId),
      completedCount: completedIds.size,
      setCardCompletion,
      getPracticeAnswer: (cardId) => progress.answers[cardId]?.value || "",
      savePracticeAnswer,
      getStretchConfidence: (cardId) => progress.confidence[cardId]?.value || "",
      saveStretchConfidence,
      getCardFeedback: (cardId) => progress.feedback[cardId]?.value || null,
      saveCardFeedback,
      activityDates: progress.activityDates,
      streakCount: calculateStreak(progress.activityDates),
      syncStatus,
    };
  }, [
    progress,
    saveCardFeedback,
    savePracticeAnswer,
    saveStretchConfidence,
    setCardCompletion,
    syncStatus,
  ]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// This hook intentionally shares the context from the provider in this module.
// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider.");
  return context;
}
