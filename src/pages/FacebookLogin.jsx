import React from "react";
import { setSecretToken } from "../Store/FbSlice";
import { useDispatch } from "react-redux";
import { handleButtonClick, statusChangeCallback } from "../Utils/fb";

FB.getLoginStatus(function (response) {
  statusChangeCallback(response);
});

const FacebookLogin = () => {
  return (
    <div>
      <button onClick={handleButtonClick}>Login with Facebook</button>
    </div>
  );
};

export default FacebookLogin;
