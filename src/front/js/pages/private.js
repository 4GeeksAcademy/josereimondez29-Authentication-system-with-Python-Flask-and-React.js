import React from "react";
import { useNavigate } from "react-router-dom";
import './../../styles/Private.css';

export const Private = ({ username }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el token del almacenamiento local
        localStorage.removeItem('jwt-token');
        // Redireccionar al usuario a la página de inicio de sesión
        navigate("/login"); // Cambia "/login" por la ruta correcta si es diferente
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 private-container">
                    <h1 className="text-center">Bienvenido, {username}!</h1>
                    <p className="text-center">¡Gracias por iniciar sesión!</p>
                    <div className="text-center">
                        <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
};