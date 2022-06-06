import { FBAuthProvider } from "@matterhorn-studios/react-fb-auth";
import { browserSessionPersistence } from "firebase/auth";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { fb_auth, g_provider } from "./firebase";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FBAuthProvider
    fb_auth={fb_auth}
    g_provider={g_provider}
    persistence_type={browserSessionPersistence}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FBAuthProvider>
);
