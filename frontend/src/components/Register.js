import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = (e) => {
    const userEmail = email;
    const userPassword = password;
    e.preventDefault();
    onRegister(userEmail, userPassword);
  };

  return (
    <div className="login">
      <h1 className="login__title">Sign up</h1>
      <form className="login__form" onSubmit={handleRegister}>
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
          Sign up
        </button>
      </form>
      <div className="login__signup">
        Already a member?
        <Link to="/signin" className="login__signup-link">
          {" "}
          Log in here!
        </Link>
      </div>
    </div>
  );
}

export default Register;
