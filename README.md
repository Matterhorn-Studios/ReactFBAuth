# ReactFBAuth

A simple react package ment to make React/NextJS firebase authentication easy.

### Built with Firebase web V9

_currently supports email/password and Google authentication, more will be added soon_

## Setup and Usage

#### Create a Firebase config file

This file will house your Firebase config as well as auth object and its providers. Config object comes from Firebase console.

```typescript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "API-KEY",
  authDomain: "EXAMPLE-DOMAIN.firebaseapp.com",
  projectId: "PROJECT-ID",
  storageBucket: "DOMAIN.appspot.com",
  messagingSenderId: "ID",
  appId: "ID",
  measurementId: "ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init auth
export const auth = getAuth(app);

// init google provider
export const gProvider = new GoogleAuthProvider();
gProvider.setCustomParameters({ prompt: "select_account" });
```

#### Add the provider to main

The provider takes in the auth object, the google provider, and the persistence type (https://firebase.google.com/docs/auth/web/auth-state-persistence).

```typescript
import { auth, gProvider } from "./firebase_client";
import { browserLocalPersistence } from "firebase/auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FBAuthProvider
    fb_auth={auth}
    g_provider={gProvider}
    persistence_type={browserLocalPersistence}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FBAuthProvider>
);
```

#### Use anywhere

Basic App.tsx example:

```typescript
import { useFBAuth } from "@matterhorn-studios/react-fb-auth";

function App() {
  const { user, loading, error, googleSignIn, logOut } = useFBAuth();

  if (loading) return <h1>LOADING</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  return (
    <div>
      {user ? (
        <>
          <div>{user.displayName}</div>
          <button onClick={logOut}>log out</button>
        </>
      ) : (
        <>
          <div>no user found</div>
          <button onClick={googleSignIn}>google sign in</button>
        </>
      )}
    </div>
  );
}

export default App;
```

#### Methods on useFBAuth()

- `googleSignIn` Prompts the user to sign in with google, populates the user, loading, and error object
- `emailSignIn(email: string, password: string)` Signs the user in with the provided email and password, populates the user, loading, and error object
- `emailSignUp(email: string, password: string)` Signs the user up with the provided email and password, populates the user, loading, and error object
- `logOut` Logs the user out
- `clearError` Clears the error object (resets it to null)
