import axios, {AxiosResponse} from "axios";
import {API_URL} from "@/config.ts";

export class SaidaService {

    constructor() {}

    async getProducts():Promise<any[]>{
        try{
            const res = await axios.get(API_URL + "/products");
            return res.data
        }catch (error) {
            console.log(error);
        }
    }

    async salvarSaida(saida: {
        valor_total: number;
        vendedor: { id: any };
        itens: { produto: { id: any; p: number; m: number; g: number }; quantidade: number }[]
    }):Promise<void>{
        try{
            const result = await axios.post(`${API_URL}/saidas`, {
                    "valor_total": 100,
                    "vendedor": {
                        "id": 2
                    },
                    "itens": [
                        {
                            "produto": 8,
                            "quantidade": 10
                        },
                        {
                            "produto":8,
                            "quantidade": 10
                        }
                    ]
                },
                {
                    headers: {"Content-Type": "application/json"}
                });
            console.log(result);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

}