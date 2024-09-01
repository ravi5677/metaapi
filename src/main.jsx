import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import FbStore from "./Store/FbStore.jsx";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={FbStore}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </StrictMode>
);
