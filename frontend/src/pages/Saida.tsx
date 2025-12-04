import {useEffect, useState} from "react";
import { Plus, Package, Trash2 } from "lucide-react";
import { z } from "zod";
import {SaidaService} from "@/services/SaidaService/SaidaService.ts";

interface ProductItem {
    id: string;
    productName: string;
    sizeP: number;
    sizeM: number;
    sizeG: number;
    unitPrice: number;
    totalQuantity: number;
    totalPrice: number;
}

interface Product {
    name: string;
    sizeP: number;
    sizeM: number;
    sizeG: number;
}

const productSchema = z.object({
    name: z.string().min(1, "O nome do produto é obrigatório"),
    sizeP: z.number().int().min(0, "A quantidade do tamanho P não pode ser negativa").optional(),
    sizeM: z.number().int().min(0, "A quantidade do tamanho M não pode ser negativa").optional(),
    sizeG: z.number().int().min(0, "A quantidade do tamanho G não pode ser negativa").optional(),
}).refine((data) => {
    // Verifica se pelo menos um tamanho tem quantidade maior que 0
    return data.sizeP > 0 || data.sizeM > 0 || data.sizeG > 0;
}, {
    message: 'Pelo menos um tamanho (P, M ou G) deve ter quantidade maior que zero',
});

const saidaService:SaidaService = new SaidaService();

const Saida = () => {
    const [availableProd, setAvailableProd] = useState([]);
    const [product, setProduct] = useState<Product>({ name: '', sizeP: 0, sizeM: 0, sizeG: 0 });
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [toastMessage, setToastMessage] = useState<{ title: string; description: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const result = await saidaService.getProducts();
                setAvailableProd(result);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        };

        loadProducts()
    }, []);


    const showToast = (title: string, description: string, type: 'success' | 'error' = 'success') => {
        setToastMessage({ title, description, type });
        setTimeout(() => setToastMessage(null), 3000);
    };

    const calculateTotal = () => {
        return products.reduce((sum, item) => sum + item.totalPrice, 0);
    };

    const validateForm = () => {
        try {
            productSchema.parse(product);
            return true;
        } catch (error) {
            // console.log(error)0;
            return false;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'name' ? value : parseInt(value) || 0
        }));
    };

    const handleSelectChange = (value: string) => {
        setProduct(prev => ({
            ...prev,
            name: value
        }));
    };

    const addProduct = () => {
        if (!validateForm()) {
            showToast(
                "Formulário inválido",
                "Preencha todos os campos corretamente. Pelo menos um tamanho deve ter quantidade maior que zero.",
                "error"
            );
            return;
        }

        const selectedProduct = availableProd.find(p => p.name === product.name);
        if (!selectedProduct) {
            showToast(
                "Produto não selecionado",
                "Por favor, selecione um produto antes de adicionar.",
                "error"
            );
            return;
        }

        const totalQuantity = product.sizeP + product.sizeM + product.sizeG;

        const newProduct: ProductItem = {
            id: Date.now().toString(),
            productName: selectedProduct.name,
            sizeP: product.sizeP,
            sizeM: product.sizeM,
            sizeG: product.sizeG,
            unitPrice: selectedProduct.preco_venda,
            totalQuantity,
            totalPrice: selectedProduct.preco_venda * totalQuantity,
        };

        setProducts([...products, newProduct]);

        // Reset form
        setProduct({ name: "", sizeG: 0, sizeM: 0, sizeP: 0 });

        showToast(
            "Produto adicionado",
            `${selectedProduct.name} foi adicionado à lista de saída.`,
            "success"
        );
    };

    const removeProduct = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
        showToast(
            "Produto removido",
            "O produto foi removido da lista.",
            "success"
        );
    };

    const confirmExit = async () => {
        if (products.length === 0) {
            showToast(
                "Lista vazia",
                "Adicione produtos antes de confirmar a saída.",
                "error"
            );
            return;
        }

        // Formata os dados no formato esperado pelo backend
        const saidaData = {
            valor_total: calculateTotal(),
            vendedor: {
                id: JSON.parse(localStorage.getItem("user")).id
            },
            itens: products.map(product => {
                const selectedProduct = availableProd.find(p => p.name === product.productName);
                return {
                    produto: {
                        id: selectedProduct?.id || 0,
                        p: product.sizeP,
                        m: product.sizeM,
                        g: product.sizeG,
                    },
                    quantidade: product.totalQuantity
                };
            })
        };

        try {
            console.log("Enviando para o backend:", saidaData);


            await saidaService.salvarSaida(saidaData);

            showToast(
                "Saída confirmada",
                `Total de ${products.length} produto(s) processados com sucesso!`,
                "success"
            );

            setProducts([]);
        } catch (error) {
            console.error("Erro ao salvar saída:", error);
            showToast(
                "Erro ao salvar",
                "Ocorreu um erro ao processar a saída. Tente novamente.",
                "error"
            );
        }
    };
    const isFormValid = validateForm();
    const hasProducts = products.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-orange-50 p-6">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                {/*<div className="text-center mb-8">*/}
                {/*    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent">*/}
                {/*        出庫管理*/}
                {/*    </h1>*/}
                {/*    <p className="text-lg text-gray-600">Saída de Produtos</p>*/}
                {/*</div>*/}

                {/* Total Counter */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-red-600">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Package className="h-8 w-8 text-red-600" />
                            <div>
                                <p className="text-sm text-gray-600">Valor Total da Saída</p>
                                <p className="text-3xl font-bold text-red-600">
                                    R$ {calculateTotal().toFixed(2).replace('.', ',')}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Total de Itens</p>
                            <p className="text-2xl font-bold">{products.length}</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Adicionar Produto
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="product" className="block text-sm font-medium text-gray-700">
                                    Produto
                                </label>
                                <select
                                    id="product"
                                    value={product.name}
                                    onChange={(e) => handleSelectChange(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                >
                                    <option value="">Selecione um produto</option>
                                    {availableProd.map((prod) => (
                                        <option key={prod.name} value={prod.name}>
                                            {prod.name} - R$ {prod.preco_venda.toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="sizeP" className="block text-sm font-medium text-gray-700">
                                        Tamanho P
                                    </label>
                                    <input
                                        id="sizeP"
                                        name="sizeP"
                                        type="number"
                                        min="0"
                                        value={product.sizeP}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="sizeM" className="block text-sm font-medium text-gray-700">
                                        Tamanho M
                                    </label>
                                    <input
                                        id="sizeM"
                                        name="sizeM"
                                        type="number"
                                        min="0"
                                        value={product.sizeM}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="sizeG" className="block text-sm font-medium text-gray-700">
                                        Tamanho G
                                    </label>
                                    <input
                                        id="sizeG"
                                        name="sizeG"
                                        type="number"
                                        min="0"
                                        value={product.sizeG}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={addProduct}
                                disabled={!isFormValid}
                                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                                    isFormValid
                                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                <Plus className="h-4 w-4" />
                                Adicionar à Lista
                            </button>
                        </div>
                    </div>

                    {/* Products List Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
                            <h2 className="text-xl font-bold text-white">
                                Produtos Adicionados
                            </h2>
                        </div>
                        <div className="p-6">
                            {products.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Nenhum produto adicionado ainda</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                    {products.map((prod) => (
                                        <div
                                            key={prod.id}
                                            className="p-4 rounded-lg border border-gray-200 bg-gray-50 hover:border-orange-500 transition-all hover:shadow-md"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">{prod.productName}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        P: {prod.sizeP} | M: {prod.sizeM} | G: {prod.sizeG}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Qtd. Total: {prod.totalQuantity} unidades
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeProduct(prod.id)}
                                                    className="p-2 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t">
                                                <span className="text-sm">Valor unitário: R$ {prod.unitPrice.toFixed(2)}</span>
                                                <span className="font-bold text-red-600">
                                                    R$ {prod.totalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={confirmExit}
                        disabled={!hasProducts}
                        className={`px-12 py-6 text-lg rounded-lg font-semibold transition-all shadow-lg ${
                            hasProducts
                                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:scale-105'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Confirmar Saída de Produtos
                    </button>
                </div>

                {/* Toast Notification */}
                {toastMessage && (
                    <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
                        <div className={`rounded-lg shadow-lg p-4 min-w-[300px] ${
                            toastMessage.type === 'success' ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                        }`}>
                            <h3 className={`font-bold mb-1 ${
                                toastMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
                            }`}>
                                {toastMessage.title}
                            </h3>
                            <p className={`text-sm ${
                                toastMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {toastMessage.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Saida;