import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    createUserRequest,
    getUsersRequest,
    updateUserStatusRequest,
    updateUserRequest
} from "../features/users/users.service";

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newUser, setNewUser] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        telefono: "",
        id_rol: 2
    });

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsersRequest();
            setUsers(data.users || []);
        } catch (err) {
            setError(err.response?.data?.message || "Error al cargar usuarios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const toggleStatus = async (id, activo) => {
        try {
            await updateUserStatusRequest(id, !activo);
            loadUsers();
        } catch (err) {
            setError(err.response?.data?.message || "No se pudo actualizar");
        }
    };

    const handleEdit = async (id, user) => {
        const nombre = window.prompt("Nombre:", user.nombre);
        const apellido = window.prompt("Apellido:", user.apellido);
        const correo = window.prompt("Correo:", user.correo);
        const telefono = window.prompt("Teléfono:", user.telefono);
        const id_rol = window.prompt("Rol (1=Admin, 2=Cajero, 3=Almacen):", user.id_rol);

        if (!nombre || !apellido || !correo || !telefono || !id_rol) {
            return;
        }

        try {
            await updateUserRequest(id, {
                nombre,
                apellido,
                correo,
                telefono,
                id_rol: Number(id_rol)
            });
            loadUsers();
        } catch (err) {
            setError(err.response?.data?.message || "No se pudo actualizar");
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();

        try {
            await createUserRequest({
                ...newUser,
                id_rol: Number(newUser.id_rol)
            });

            setShowCreateModal(false);
            setNewUser({
                nombre: "",
                apellido: "",
                correo: "",
                password: "",
                telefono: "",
                id_rol: 2
            });
            loadUsers();
        } catch (err) {
            setError(err.response?.data?.message || "No se pudo crear el usuario");
        }
    };

    return (
        <div style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1>Gestión de usuarios</h1>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => setShowCreateModal(true)}>Agregar usuario</button>
                    <button onClick={() => navigate("/dashboard")}>Volver al dashboard</button>
                </div>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Nombre</th>
                            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Apellido</th>
                            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Correo</th>
                            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Teléfono</th>
                            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Rol</th>
                            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Estado</th>
                            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id_usuario}>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{user.nombre}</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{user.apellido}</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{user.correo}</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{user.telefono}</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{user.rol}</td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                                    {user.activo ? "Activo" : "Inactivo"}
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                                    <button onClick={() => toggleStatus(user.id_usuario, user.activo)}>
                                        {user.activo ? "Desactivar" : "Activar"}
                                    </button>
                                    <button onClick={() => handleEdit(user.id_usuario, user)} style={{ marginLeft: "8px" }}>
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showCreateModal && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        background: "white",
                        padding: "24px",
                        borderRadius: "10px",
                        width: "420px"
                    }}>
                        <h2>Agregar usuario</h2>

                        <form onSubmit={handleCreateUser}>
                            <div style={{ marginBottom: "12px" }}>
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    value={newUser.nombre}
                                    onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "6px" }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label>Apellido</label>
                                <input
                                    type="text"
                                    value={newUser.apellido}
                                    onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "6px" }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label>Correo</label>
                                <input
                                    type="email"
                                    value={newUser.correo}
                                    onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "6px" }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "6px" }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label>Teléfono</label>
                                <input
                                    type="text"
                                    value={newUser.telefono}
                                    onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "6px" }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label>Rol</label>
                                <select
                                    value={newUser.id_rol}
                                    onChange={(e) => setNewUser({ ...newUser, id_rol: Number(e.target.value) })}
                                    style={{ width: "100%", padding: "8px", marginTop: "6px" }}
                                >
                                    <option value={1}>Administrador</option>
                                    <option value={2}>Cajero</option>
                                    <option value={3}>Almacen</option>
                                </select>
                            </div>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <button type="submit">Guardar</button>
                                <button type="button" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
