import React from "react";
import { fetchProfileData, setSecretToken } from "../Store/FbSlice";
import { useDispatch } from "react-redux";
const FacebookLogin = () => {
  const dispatch = useDispatch();
  const statusChangeCallback = (response) => {
    if (response.status === "connected") {
      const authResponse = response.authResponse;
      // dispatch(
      //   setSecretToken({
      //     accessToken: authResponse.accessToken,
      //     userID: authResponse.userID,
      //   })
      // );
      //dispatch(fetchProfileData());
      //console.log("Successfully logged in with Facebook");
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

  // FB.getLoginStatus(function (response) { // It calls many times in a second handle accordingly
  //   statusChangeCallback(response);
  // });
  return (
    <div>
      <button type="button" className="button" onClick={handleButtonClick}>
        <div className="facebookIcon">
          <div className="svgContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26px"
              height="26px"
              viewBox="0 0 90 90"
            >
              <g>
                <path
                  d="M90,15.001C90,7.119,82.884,0,75,0H15C7.116,0,0,7.119,0,15.001v59.998   C0,82.881,7.116,90,15.001,90H45V56H34V41h11v-5.844C45,25.077,52.568,16,61.875,16H74v15H61.875C60.548,31,59,32.611,59,35.024V41   h15v15H59v34h16c7.884,0,15-7.119,15-15.001V15.001z"
                  fill="#FFFFFF"
                ></path>
              </g>
            </svg>
          </div>
          <div style={{ width: "10px" }}></div>
          <div style={{ textAlign: "left", width: "100%" }}>
            Log in with Facebook
          </div>
        </div>
      </button>
    </div>
  );
};

export default FacebookLogin;
