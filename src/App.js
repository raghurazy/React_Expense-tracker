import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Expense from "./Components/ExpenseTracker/Expense";
import RootLayout from "./Components/Layout/Root";
import Profile from "./Components/Profile/Profile";

import SignupLogin from "./Components/SignupLogin/SignupLogin";
import { themeActions } from "./store/theme-slice";

function App() {
  const isLoggedIn = useSelector(state => state.auth.token !== null)
  const isDarkMode = useSelector(state => state.theme.isDark);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(themeActions.toggelTheme());
  // },[]);

  return (
      <div className={`App ${(isLoggedIn && isDarkMode) ? 'darkTheme' : 'lightTheme'}`}>
        <Routes>
          <Route path="/" element={<SignupLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/expense-tracker" element={<RootLayout />}>
            <Route index element={<Expense />} />
          </Route>
        </Routes>
      </div>
  );
}

export default App;