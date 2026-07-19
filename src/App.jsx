import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/collections/:collectionId"
          element={<CollectionPage />}
        />

        <Route
          path="/cards/:cardId"
          element={<JourneyCardPage />}
        />
      </Routes>
    </>
  );
}

export default App;
