import { useDispatch } from "react-redux";
import { setSecretToken } from "../Store/FbSlice";

export const statusChangeCallback = (response) => {
  console.log(response);
  if (response.status === "connected") {
    const dispatch = useDispatch(setSecretToken({ accessToken, userID }));
    console.log("Successfully logged in with Facebook");
  } else if (response.status === "not_authorized") {
    console.log("Logged into Facebook but not your app.");
  } else {
    console.log("Not logged into Facebook.");
  }
};

export const checkLoginState = () => {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
};

export const handleButtonClick = () => {
  FB.login(
    function (response) {
      checkLoginState(response);
    },
    { scope: "public_profile,email", config_id: "2335936246749582" }
  );
};
