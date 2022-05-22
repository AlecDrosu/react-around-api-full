
import React from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    const userEmail = email;
    const userPassword = password;
    e.preventDefault();
    onLogin(userEmail, userPassword);
  };

  return (
    <div className="login">
      <h1 className="login__title">Log in</h1>
      <form className="login__form" onSubmit={handleLogin}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__button" type="submit">
          Log in
        </button>
      </form>
      <div className="login__signup">
        Not a member yet?
        <Link to="/signup" className="login__signup-link">
          {" "}
          Sign up here!
        </Link>
      </div>
    </div>
  );
}

export default Login;
