import React from "react";
window.fbAsyncInit = function () {
  FB.init({
    appId: "1035426781614046",
    xfbml: true,
    version: "v20.0",
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

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
    { scope: "public_profile,email", config_id: "2335936246749582" }
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
