import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    loginRequest,
    getCurrentUser,
    logoutRequest
} from "../features/auth/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    const login = async (correo, password) => {

        const data = await loginRequest({
            correo,
            password
        });

        setUser(data.user);

        return data;
    };

    const logout = async () => {

        try {
            await logoutRequest();
        } finally {
            setUser(null);
        }
    };

    const checkAuth = async () => {

        try {

            const data = await getCurrentUser();

            setUser(data.user);

        } catch (error) {

            setUser(null);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider"
        );
    }

    return context;
};