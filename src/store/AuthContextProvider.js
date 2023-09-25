import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";


const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const onRefresh = () => {
    if (token == null && localStorage.length !== 0) {
      setToken(localStorage["user"]);
      setUserEmail(localStorage['userEmail'])
    }
  }
  
  useEffect(() => {
    onRefresh();
  }, [])

  const userLoggedIn = !!token;

  const loginHandler = (tokenId, email) => {
    setToken(tokenId);
    setUserEmail(email);
    localStorage.setItem('user', tokenId);
    localStorage.setItem('userEmail', email);

  };
  const logoutHandler = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
  };
  

  const authContext = {
    token: token,
    isLoggedIn: userLoggedIn,
    userEmail: userEmail, 
    login: loginHandler,
    logout: logoutHandler,
  };
  

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;