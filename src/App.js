import "./App.css";
import Home from "./pages/Home";
import Question from "./pages/Question";
import Result from "./pages/Result";
import NameGpt from "./pages/NameGpt"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />
        <Route path="/nameGpt" element={<NameGpt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
