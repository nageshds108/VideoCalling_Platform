import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Authentication from "./Pages/Authentication";
import VideoComponent from "./Pages/VideoComponent";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Authentication />} />
      <Route path="/:url" element={<VideoComponent />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
