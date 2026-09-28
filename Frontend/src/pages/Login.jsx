import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/auth.css";

const Login = () => {

    const navigate = useNavigate();

    const {
        login
    } = useAuth();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await login(
                correo,
                password
            );

            navigate("/dashboard");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Error al iniciar sesión"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>
                    Abarrotes
                </h1>

                <p>
                    Iniciar sesión
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            value={correo}
                            onChange={(e) =>
                                setCorreo(e.target.value)
                            }
                            placeholder="correo@ejemplo.com"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Contraseña
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="••••••••"
                            required
                        />

                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Iniciando sesión..."
                            : "Iniciar sesión"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Login;