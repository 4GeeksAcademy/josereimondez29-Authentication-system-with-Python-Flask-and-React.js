import React, { useState } from 'react';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const register = async (email, password) => {
    try {
      const resp = await fetch(`https://improved-waddle-qw4wjwv5xr5hxpr7-3001.app.github.dev/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!resp.ok) {
        throw Error("There was a problem in the registration request");
      }

      const data = await resp.json();
      localStorage.setItem("jwt-token", data.token);
      // Aquí puedes guardar el usuario en la store utilizando la función setItem
      // O realizar otras acciones necesarias después del registro exitoso
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    await register(email, password);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Register</button>
            {error && <div className="mt-3 text-danger">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};


