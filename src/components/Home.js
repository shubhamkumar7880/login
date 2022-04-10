import { Fragment, useState, useRef } from "react";

const Home = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    retriveToken();
  };
  const retriveToken = () => {
    const storedToken = localStorage.getItem("token");
    props.onToken(storedToken);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB68I9mpF_Y_O4e69KQ57wZJWPbdp6cPq8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB68I9mpF_Y_O4e69KQ57wZJWPbdp6cPq8";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        loginHandler(data.idToken);
      });
  };
  return (
    <Fragment>
      <div>
        <h1>{isLogin ? "Log in" : "Sign up"}</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>

          <div>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div>
            <button>{isLogin ? "Login" : "Create Account"}</button>
          </div>
          <div>
            <button type="button" onClick={switchHandler}>
              {isLogin ? "create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Home;
