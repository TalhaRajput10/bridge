import { useEffect } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import JourneyCardPage from "./pages/JourneyCardPage.jsx";
import ResourcesPage from "./pages/ResourcesPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import GuidesPage from "./pages/GuidesPage.jsx";
import GuideArticlePage from "./pages/GuideArticlePage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import SeoManager from "./components/SeoManager.jsx";
import { captureAppError, trackEvent } from "./lib/telemetry.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function TelemetryObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    trackEvent("page_view", { pathname });
  }, [pathname]);

  useEffect(() => {
    function handleError(event) {
      captureAppError(event.error || event.message, { source: "window-error" });
    }

    function handleUnhandledRejection(event) {
      captureAppError(event.reason, { source: "unhandled-rejection" });
    }

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}

function JourneyCardRoute() {
  const { cardId } = useParams();
  return <JourneyCardPage key={cardId} />;
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollToTop />
      <TelemetryObserver />
      <SeoManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:guideId" element={<GuideArticlePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/collections/:collectionId" element={<CollectionPage />} />
        <Route path="/cards/:cardId" element={<JourneyCardRoute />} />
      </Routes>
    </>
  );
}

export default App;
