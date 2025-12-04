import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";
import {authenticate} from "@/services/AuthService/AuthService.ts";
import {IUser} from "@/interfaces/UserInterfaces.ts";

export const AuthContext = createContext(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAdmin, setisAdmin] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>(null);
    useEffect(() => {
        console.log(isAdmin);
    },[])

    const adminRoles = ["admin", "gerente"];

    const login = async (user: IUser) => {
        try {
            const response = await authenticate(user);

            if (response.status === 401) {
                throw new Error("Usuário ou senha incorretos");
            }

            if (response.status === 200 && response.data) {
                const userData = response.data;

                const isAdmin = adminRoles.includes(userData.role);
                setisAdmin(isAdmin);

                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);

                return userData;
            }

            throw new Error("Erro inesperado ao autenticar.");
        } catch (error: any) {
            console.error("Erro ao fazer login:", error.message);
            throw error;
        }
    };

    const logout = () => {
        setisAdmin(false);
        setUser(null);
        localStorage.removeItem("user");
    };


    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};