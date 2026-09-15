import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(() => ({
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user") || "null")
    }));

    const login = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setSession({ token, user });
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setSession({ token: null, user: null });
    };

    const value = useMemo(() => ({ ...session, isAuthenticated: Boolean(session.token), login, logout }), [session]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
