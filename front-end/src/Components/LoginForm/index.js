import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import "./styles.css";

const LoginForm = () => {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: login API
    auth.signIn({ email, password });

  };

  return (
    <div className="login-form">
      <div className="login-form__email">Login</div>
      <form onSubmit={handleLogin}>
        <div className="login-form__input-wrapper">
          <label className="login-form__input-label" htmlFor="email">
            Email:
          </label>
          <input
            placeholder="Enter email"
            className="login-form__input"
            id="email"
            type="text"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div className="login-form__input-wrapper">
          <label className="login-form__input-label" htmlFor="password">
            Password:
          </label>
          <input
            placeholder="Enter password"
            className="login-form__input"
            id="password"
            type="text"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <button
          disabled={!email.length || !password.length}
          className="login-form__submit-btn"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
