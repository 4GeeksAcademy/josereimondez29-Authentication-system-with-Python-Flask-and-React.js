import React, { useContext } from "react"; // import useContext
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { actions } = useContext(Context);

  const handleLogout = () => {
    actions.logout();
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {!sessionStorage.getItem("token") ? (
            <>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
              {/* Moved Register button to be shown when there's no token */}
              <Link to="/register">
                {" "}
                {/* Assuming you have a route for registration */}
                <button className="btn btn-secondary">Register</button>
              </Link>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
