import React, { Fragment, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ExpenseForm from "../ExpenseTracker/ExpenseForm";

import classes from "./Profile.module.css";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = (props) => {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isLocation = location.pathname === "/profile";
  

  const updateVisibleHandler = async () => {
    
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAZobg4eyNJoipHhkpdx2cBTzNXFEEDHN8",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
        }
      );
      const data = await res.json();
      setUserData(data.users[0]);
    } catch (error) {
      alert(error);
    }
    navigate("/profile", { replace: true });
  };

  const clickLogoutHandler = () => {
    authCtx.logout();
    navigate('/',{replace: true});

  };

  return (
    <Fragment>
      <section className={classes.proCon}>
        <div className={classes.header}>
          <div className={classes.headerDetail}>
            <p>Welcome to Expense tracker</p>
            <span className={classes.incomplete}>
              {!isLocation ? (
                "Your Profile is incomplete. "
              ) : (
                <React.Fragment>
                  Your profile <strong>x%</strong> completed.
                </React.Fragment>
              )}
              <button onClick={updateVisibleHandler}>Complete now</button>
            </span>
          </div>
          <div>
            <Button variant="danger" onClick={clickLogoutHandler}>Log out</Button>
          </div>
        </div>
      </section>
    {isLocation && <UpdateProfileForm user={userData} />}
    </Fragment>
  );
};

export default Profile;