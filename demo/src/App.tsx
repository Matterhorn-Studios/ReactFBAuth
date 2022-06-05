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
