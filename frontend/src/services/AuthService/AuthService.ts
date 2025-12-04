import {API_URL} from "@/config";
import axios from "axios";
import { IUser } from "@/interfaces/UserInterfaces.ts";

export async function authenticate(user: IUser) {
    try {
        return await axios.post(`${API_URL}/users/auth`, {
            name: user.name,
            password: user.password,
        }, {headers: {"Content-Type": "application/json"}});

    } catch (error: any) {
        if (error.response) {
            // O backend respondeu com status de erro (401, 403, etc.)
            if (error.response.status === 401) {
                console.warn("Credenciais inválidas.");
                throw new Error(error.response.data?.message || "Usuário ou senha incorretos.");
            } else {
                console.log(API_URL);
                console.error("Erro no servidor:", error.response);
                throw new Error("Erro no servidor. Tente novamente mais tarde.");
            }
        } else if (error.request) {
            // Nenhuma resposta (problema de rede)
            throw new Error("Não foi possível conectar ao servidor.");
        } else {
            // Erro inesperado
            console.log(error);
            throw new Error("Erro inesperado ao autenticar.");
        }
    }
}
