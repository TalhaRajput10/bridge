import { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import JourneyCardPage from "./pages/JourneyCardPage.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function JourneyCardRoute() {
  const { cardId } = useParams();

  return <JourneyCardPage key={cardId} />;
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/collections/:collectionId"
          element={<CollectionPage />}
        />

        <Route
          path="/cards/:cardId"
          element={<JourneyCardRoute />}
        />
      </Routes>
    </>
  );
}

export default App;
