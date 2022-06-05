import {
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
  User,
  signOut,
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import { createContext, FC, useContext, useState } from "react";

// interface for the context
interface IFBAuthContext {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  emailSignIn: (email: string, password: string) => Promise<void>;
  emailSignUp: (email: string, password: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
  clearError: () => void;
}

// context init
const FBAuthContext = createContext<IFBAuthContext>({
  user: null,
  loading: false,
  error: null,
  emailSignIn: async (email: string, password: string) => {},
  emailSignUp: async (email: string, password: string) => {},
  googleSignIn: async () => {},
  logOut: async () => {},
  clearError: () => {},
});

// context provider
export const FBAuthProvider: FC<{
  children: JSX.Element;
  fb_auth: Auth;
  g_provider: GoogleAuthProvider;
}> = ({ fb_auth, children, g_provider }) => {
  // state to hold the current user
  const [user, setUser] = useState<User | null>(fb_auth.currentUser);

  // state to hold the loading status
  const [loading, setLoading] = useState(false);

  // state to hold the error status
  const [error, setError] = useState<AuthError | null>(null);

  // hook to clear the error
  const clearError = () => setError(null);

  // hook to sign in a user with email
  const emailSignIn = async (email: string, password: string) => {
    setLoading(true);
    setPersistence(fb_auth, browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(fb_auth, email, password)
        .then((result) => {
          setUser(result.user);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    });
  };

  // hook to sign up with email
  const emailSignUp = async (email: string, password: string) => {
    setLoading(true);
    setPersistence(fb_auth, browserSessionPersistence).then(() => {
      createUserWithEmailAndPassword(fb_auth, email, password)
        .then((result) => {
          setUser(result.user);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    });
  };

  // hook to sign in a user with google
  const googleSignIn = async () => {
    setLoading(true);
    setPersistence(fb_auth, browserSessionPersistence).then(() => {
      signInWithPopup(fb_auth, g_provider)
        .then((result) => {
          setUser(result.user);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    });
  };

  // hook to sign a user out
  const logOut = async () => {
    await signOut(fb_auth);
    setUser(null);
  };

  // provider
  return (
    <FBAuthContext.Provider
      value={{
        user,
        loading,
        error,
        clearError,
        googleSignIn,
        logOut,
        emailSignIn,
        emailSignUp,
      }}
    >
      {children}
    </FBAuthContext.Provider>
  );
};

// context consumer
export const useFBAuth = () => useContext(FBAuthContext);
