import React from "react";

function statusChangeCallback(response) {
  console.log("statusChangeCallback");
  console.log(response);
  // app know the current login status of the person.
  if (response.status === "connected") {
    // Logged into your app and Facebook.
    console.log("Successfully logged in with Facebook");
    // You can now use the response.authResponse object to get the accessToken, userID, etc.
  } else if (response.status === "not_authorized") {
    // The person is logged into Facebook, but not your app.
    console.log("Logged into Facebook but not your app.");
  } else {
    // The person is not logged into Facebook.
    console.log("Not logged into Facebook.");
  }
}

FB.getLoginStatus(function (response) {
  statusChangeCallback(response);
});

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

const handleButtonClick = () => {
  FB.login(
    function (response) {
      checkLoginState(response);
    },
    { scope: "public_profile,email" }
  );
};

const FacebookLogin = () => {
  return (
    <div>
      <button onClick={handleButtonClick}>Login with Facebook</button>
    </div>
  );
};

export default FacebookLogin;
