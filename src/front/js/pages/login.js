import React, { useState } from "react";
import "../../styles/home.css";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const resp = await fetch(`https://improved-waddle-qw4wjwv5xr5hxpr7-3001.app.github.dev/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!resp.ok) {
        throw Error("There was a problem in the login request");
      }

      if (resp.status === 401) {
        throw Error("Invalid credentials");
      } else if (resp.status === 400) {
        throw Error("Invalid email or password format");
      }

      const data = await resp.json();
      localStorage.setItem("jwt-token", data.token);
      // Llama a getMyTasks después del inicio de sesión exitoso
      await getMyTasks(); 
      // Aquí puedes redirigir a la página de inicio o realizar otras acciones necesarias después del inicio de sesión exitoso
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    await login(email, password);
  };

  const getMyTasks = async () => {
    try {
      // Recupera el token desde la localStorage
      const token = localStorage.getItem('jwt-token');

      if (!token) {
        throw Error("Missing token");
      }

      const resp = await fetch(`https://improved-waddle-qw4wjwv5xr5hxpr7-3001.app.github.dev/api/protected`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token // ⬅⬅⬅ authorization token
        }
      });

      if (!resp.ok) {
        if (resp.status === 403) {
          throw Error("Invalid token");
        } else {
          throw Error("Server error");
        }
      }

      const data = await resp.json();
      console.log("This is the data you requested", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
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