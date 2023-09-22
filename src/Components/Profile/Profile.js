import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./Profile.module.css";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = (props) => {
  const [updateVisible, setUpdateVisible] = useState(false);
  const authCtx = useContext(AuthContext);

  const updateVisibleHandler = () => {
    setUpdateVisible(true);
    // console.log(authCtx.token)
//     try{
//         const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDH0fL1swdhEjD-qHDswBtnpxxzfef3CTI", {
//             method: "GET",
//           headers: {
//             idToken: authCtx.token,
//             "Content-Type": "application/json",
//           },
//         })

//             const userData = await res.json();
//             console.log(userData);
//     } catch(error){
//         alert(error)
//     }
  }
  return (
    <div className={classes.proCon}>
      <div className={classes.header}>
        <p>Welcome to Expense tracker</p>
        <span className={classes.incomplete}>
          {!updateVisible
            ? "Your Profile is incomplete. "
            : <React.Fragment>Your profile <strong>x%</strong> completed.</React.Fragment>}
          <Link onClick={updateVisibleHandler}>Complete now</Link>
        </span>
        
      </div>
      {updateVisible && <UpdateProfileForm />}
    </div>
  );
};

export default Profile;