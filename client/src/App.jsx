import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MatchSetup from "./pages/MatchSetup";
import History from "./pages/History";
import Game from "./pages/Game";
import Results from "./pages/Results";
import Tiebreak from "./pages/Tiebreak";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<MatchSetup />} />
        <Route path="/history" element={<History />} />
        <Route path="/game" element={<Game/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/tiebreak" element={<Tiebreak/>} />
      </Routes>
    </Router>
  );
}

export default App;
