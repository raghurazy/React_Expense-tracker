import { Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./Components/Profile/Profile";
import UpdateProfileForm from "./Components/Profile/UpdateProfileForm";

import SignupLogin from "./Components/SignupLogin/SignupLogin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/update-profile" element={<UpdateProfileForm />} /> */}
      </Routes>
    </div>
  );
}

export default App;