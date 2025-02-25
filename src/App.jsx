import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/Quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
