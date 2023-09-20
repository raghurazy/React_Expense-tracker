import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dummy from "./Components/Dummy/Dummy";

import SignupLogin from "./Components/SignupLogin/SignupLogin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/dummy" element={<Dummy />} />
      </Routes>
    </div>
  );
}

export default App;