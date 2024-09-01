import React from "react";
import { setSecretToken } from "../Store/FbSlice";
import { useDispatch } from "react-redux";
const FacebookLogin = () => {
  const dispatch = useDispatch();

  const statusChangeCallback = (response) => {
    console.log(response);
    if (response.status === "connected") {
      dispatch(
        setSecretToken({
          accessToken: response.accessToken,
          userID: response.userID,
        })
      );
      console.log("Successfully logged in with Facebook");
    } else if (response.status === "not_authorized") {
      console.log("Logged into Facebook but not your app.");
    } else {
      console.log("Not logged into Facebook.");
    }
  };
  const checkLoginState = () => {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  };

  const handleButtonClick = () => {
    FB.login(
      function (response) {
        checkLoginState(response);
      },
      { scope: "public_profile,email", config_id: "2335936246749582" }
    );
  };

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
  return (
    <div>
      <button onClick={handleButtonClick}>Login with Facebook</button>
    </div>
  );
};

export default FacebookLogin;
