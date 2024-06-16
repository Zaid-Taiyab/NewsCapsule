import React, { useState } from 'react';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};
    if (!form.username) formErrors.username = 'Username is required';
    if (!form.password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      // Dispatch login action
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={form.username} onChange={handleChange} />
          {errors.username && <span>{errors.username}</span>}
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          {errors.password && <span>{errors.password}</span>}
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
