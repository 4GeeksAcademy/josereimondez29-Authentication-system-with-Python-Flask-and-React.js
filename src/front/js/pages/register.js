import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar la visibilidad del popup
  const navigate = useNavigate();

  const register = async (email, password) => {
    try {
      const resp = await fetch(`https://improved-waddle-qw4wjwv5xr5hxpr7-3001.app.github.dev/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!resp.ok) {
        throw new Error("There was a problem in the registration request");
      }
      const data = await resp.json();
      // Mostrar el popup
      setShowPopup(true);
      // Redirigir al usuario a la página de inicio de sesión después de 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    register(email, password);
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
      {/* Mostrar el popup si showPopup es true */}
      {showPopup && (
        <div className="popup">
          <p>¡Registro exitoso! Ahora puedes iniciar sesión.</p>
        </div>
      )}
    </div>
  );
};




