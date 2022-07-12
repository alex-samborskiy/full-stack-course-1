import { useState } from "react";

import "./styles.css";

const RegisterForm = () => {

  const [form, setForm] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    dateOfBirth: undefined,
  });

  const onChangeFormValue = (key, e) => {
    setForm({ ...form, [key]: e.target.value })
  };

  const validateForm = () => {
    return Object.values(form).some(item => !item) || form.password !== form.confirmPassword;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: register API
  };

  return (
    <div className="login-form">
      <div className="login-form__email">Register</div>
      <form onSubmit={handleRegister}>
        <div className="login-form__input-wrapper">
          <label className="login-form__input-label" htmlFor="email">
            Email:
          </label>
          <input
            placeholder="Enter email"
            className="login-form__input"
            id="email"
            type="text"
            value={form.email}
            onChange={(e) => onChangeFormValue('email', e)}
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
            value={form.password}
            onChange={(e) => onChangeFormValue('password', e)}
          />
        </div>
        <div className="login-form__input-wrapper">
          <label className="login-form__input-label" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            placeholder="Enter confirm password"
            className="login-form__input"
            id="confirmPassword"
            type="text"
            value={form.confirmPassword}
            onChange={(e) => onChangeFormValue('confirmPassword', e)}
          />
        </div>
        <div className="login-form__input-wrapper">
          <label className="login-form__input-label" htmlFor="firstName">
            First Name:
          </label>
          <input
            placeholder="Enter first name"
            className="login-form__input"
            id="firstName"
            type="text"
            value={form.firstName}
            onChange={(e) => onChangeFormValue('firstName', e)}
          />
        </div>
        <div className="login-form__input-wrapper">
          <label className="login-form__input-label" htmlFor="lastName">
            Last Name:
          </label>
          <input
            placeholder="Enter last name"
            className="login-form__input"
            id="lastName"
            type="text"
            value={form.lastName}
            onChange={(e) => onChangeFormValue('lastName', e)}
          />
        </div>
        <div className="login-form__input-wrapper">
          <label className="login-form__input-label" htmlFor="dateOfBirth">
            Date Of Birth:
          </label>
          <input
            placeholder="Enter date of birth"
            className="login-form__input"
            id="dateOfBirth"
            type="text"
            value={form.dateOfBirth}
            onChange={(e) => onChangeFormValue('dateOfBirth', e)}

          />
        </div>
        <button
          disabled={validateForm()}
          className="login-form__submit-btn"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
