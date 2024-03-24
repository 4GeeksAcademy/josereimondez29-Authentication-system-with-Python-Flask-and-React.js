import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      navigate("/private"); // Redirige al usuario a la ruta /private si hay un token presente
    }
  }, [navigate]); 

  const login = async (email, password) => {
    try {
      const resp = await fetch(`https://improved-waddle-qw4wjwv5xr5hxpr7-3001.app.github.dev/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!resp.ok) {
        throw new Error("There was a problem in the login request");
      }
      const data = await resp.json();
      localStorage.setItem("jwt-token", data.token);
      navigate("/private"); // Redirige al usuario a la ruta /private después del inicio de sesión exitoso
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    login(email, password);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
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
            <button type="submit" className="btn btn-primary btn-block">Login</button>
            {error && <div className="mt-3 text-danger">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

