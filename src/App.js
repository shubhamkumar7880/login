import { Fragment, useState } from "react";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";

function App() {
  let profile;
  const [content, setContent] = useState(null);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setContent(null);
  };
  const getToken = (token) => {
    setContent(token);
  };
  if (content === null) {
    profile = <h1>Please, Log in</h1>;
  } else {
    profile = <UserProfile onLogout={logoutHandler} />;
  }
  return (
    <Fragment>
      <Home onToken={getToken} />
      {profile}
    </Fragment>
  );
}

export default App;
