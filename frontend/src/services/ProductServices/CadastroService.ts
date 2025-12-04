import axios from "axios";
import {API_URL} from "@/config.ts";

export class CadastroService {

    constructor() {}

    async salvarProduct(product: any): Promise<any> {
        try{
            return await axios.post(`${API_URL}/products/cadastro`, product,
               {
                   headers: {"Content-Type": "application/json"}
               });
        }catch(error){
            console.log(error);
            throw error;
        }
    }

}