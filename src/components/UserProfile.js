import { Fragment } from "react";

const UserProfile = (props) => {
  const logoutHandler = () => {
    props.onLogout();
  };
  return (
    <Fragment>
      <h1>Successfully log in</h1>
      <button onClick={logoutHandler}>Logout</button>
    </Fragment>
  );
};

export default UserProfile;
