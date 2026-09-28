import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../features/auth/auth.service";

import "../styles/auth.css";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        telefono: "",
        id_rol: 2
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await registerRequest({
                ...form,
                id_rol: Number(form.id_rol)
            });

            navigate("/login");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Error al registrar el usuario"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Abarrotes</h1>
                <p>Crear cuenta</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Ej. Ana"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            value={form.apellido}
                            onChange={handleChange}
                            placeholder="Ej. García"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            name="correo"
                            value={form.correo}
                            onChange={handleChange}
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Teléfono</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            placeholder="4610000000"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Rol</label>
                        <select
                            name="id_rol"
                            value={form.id_rol}
                            onChange={handleChange}
                        >
                            <option value={1}>Administrador</option>
                            <option value={2}>Cajero</option>
                            <option value={3}>Almacen</option>
                        </select>
                    </div>

                    {error && (
                        <div className="register-error">{error}</div>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>

                    <div className="form-link">
                        <Link to="/login">Ya tengo cuenta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
