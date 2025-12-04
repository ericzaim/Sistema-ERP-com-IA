import Navbar from "@/components/Navbar"
import { useEffect } from "react";
import heroBackground from "@/assets/hero-background.jpg";

const Cart = () => {

    const tableCols = [
        { name:"Itens" },
        { name:"Quantidade" },
        { name: "Valor" },
        { name:"Total" }
    ]
    const produtos = [
        {
            nome: "Camiseta Básica Branca",
            quantidade: 25,
            valor_unitario: 39.90,
            total:1234.50
        },
        {
            nome: "Calça Jeans Slim",
            quantidade: 15,
            valor_unitario: 129.90,
            total:1234.50
        },
        {
            nome: "Jaqueta de Couro Sintético",
            quantidade: 8,
            valor_unitario: 249.90,
            total:1234.50
        },
        {
            nome: "Vestido Floral",
            quantidade: 12,
            valor_unitario: 99.90,
            total:1234.50
        },
        {
            nome: "Tênis Casual Preto",
            quantidade: 20,
            valor_unitario: 199.90,
            total:1234.50
        },
        {
            nome: "Shorts Jeans",
            quantidade: 18,
            valor_unitario: 79.90,
            total:1234.50
        },
    ]
    useEffect(() => {

    }, []);
    return (
        <>
            <Navbar/>
            <main className="flex flex-1 h-screen items-center justify-center">
                <div className="flex flex-col w-[70%] h-[80%] max-md:w-[90%] max-md:h-[80%] p-4">
                    <table className="table-auto w-full h-full border-collapse bg-white rounded-xl overflow-hidden shadow">
                        <thead className="bg-gray-500">
                            <tr>
                                {tableCols.map((item) => (
                                    <th key={item.name} className="py-5 text-center font-semibold border">
                                        {item.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((item, index) => (
                                <tr key={index} className="even:bg-gray-300">
                                    <td className="h-[1px] text-center border">{item.nome}</td>
                                    <td className="text-center border">{item.quantidade}</td>
                                    <td className="text-center border">{item.valor_unitario}</td>
                                    <td className="text-center border">{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-500 h-[5dvh]">
                                <td colSpan={3} className="px-10 text-start font-bold text-white">Total</td>
                                <td className="text-center font-bold text-white">
                                    R$ {produtos.reduce((acc, item) => acc + item.total, 0)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </main>
        </>
    )
}



export default Cart