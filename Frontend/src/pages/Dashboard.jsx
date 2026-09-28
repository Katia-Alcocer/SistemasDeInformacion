import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

    const navigate = useNavigate();

    const {
        user,
        logout
    } = useAuth();

    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };

    return (
        <div>

            <h1>
                Dashboard
            </h1>

            <h2>
                Bienvenido, {user?.nombre}
            </h2>

            <p>
                Correo: {user?.correo}
            </p>

            <p>
                Rol: {user?.rol}
            </p>

            <button onClick={handleLogout}>
                Cerrar sesión
            </button>

        </div>
    );
};

export default Dashboard;