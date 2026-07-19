import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import JourneyCardPage from "./pages/JourneyCardPage.jsx";

function App() {
  return (
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
  );
}

export default App;