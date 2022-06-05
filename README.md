# ReactFBAuth

A simple react package ment to make React/NextJS firebase authentication easy.

### Built with Firebase web V9

_currently supports email/password and Google authentication, more will be added soon_

## Setup and Usage

#### Create a Firebase config file

This file will house your Firebase config as well as auth object and its providers.

```typescript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhxLWbmaTX9UEZxE1rX4Q3lRwI6y0b-MM",
  authDomain: "benjamin-davis-tech.firebaseapp.com",
  projectId: "benjamin-davis-tech",
  storageBucket: "benjamin-davis-tech.appspot.com",
  messagingSenderId: "269577017377",
  appId: "1:269577017377:web:93a790d017d0253fa1ab60",
  measurementId: "G-JLFKQW30NM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init app
export const auth = getAuth(app);

// init google provider
export const gProvider = new GoogleAuthProvider();
gProvider.setCustomParameters({ prompt: "select_account" });
```

#### Add the provider to main

```typescript
import { auth, gProvider } from "./firebase_client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FBAuthProvider fb_auth={auth} g_provider={gProvider}>
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

`googleSignIn` Prompts the user to sign in with google, populates the user, loading, and error object
`emailSignIn(email: string, password: string)` Signs the user in with the provided email and password, populates the user, loading, and error object
`emailSignUp(email: string, password: string)` Signs the user up with the provided email and password, populates the user, loading, and error object
`logOut` Logs the user out
`clearError` Clears the error object (resets it to null)
