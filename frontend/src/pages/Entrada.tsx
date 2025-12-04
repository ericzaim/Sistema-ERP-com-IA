import React, { useEffect, useState } from 'react';
import { Package, DollarSign, Hash, FileText, Plus, Check } from 'lucide-react';
import Select from "react-select";
import { z } from 'zod';

export default function Entrada() {
    // React Hooks
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        price: '',
        quantity: '',
        p:'0',
        m:'0',
        g:'0',
        category: ''
    });
    const [products, setProducts] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Form Values and validation
    const categories = [
        { value: 'Camisa', label: 'Camisa' },
        { value: 'Bermuda', label: 'Bermuda' },
        { value: 'Blusa', label: 'Blusa' },
        { value: 'Intima', label: 'Roupa Intima' },
        { value: 'Vestido', label: 'Vestido' },
        { value: 'Macacao', label: 'Macacão' },
    ];

    // Definindo o esquema de validação com Zod
    const productSchema = z.object({
        name: z.string().min(1, { message: 'Nome do produto é obrigatório' }),
        code: z.string().min(1, { message: 'Código do produto é obrigatório' }),
        description: z.string().optional(),
        price: z.number().positive({ message: 'Preço deve ser maior que zero' }),
        quantity: z.number().int().optional(),
        p: z.number().int().min(0).optional(),
        m: z.number().int().min(0).optional(),
        g: z.number().int().min(0).optional(),
        category: z.string().min(1, { message: 'Categoria é obrigatória' }),
    }).refine((data) => {
        // Verifica se pelo menos um dos campos de quantidade está preenchido e maior que 0
        const hasP = data.p && data.p > 0;
        const hasM = data.m && data.m > 0;
        const hasG = data.g && data.g > 0;
        const hasQuantity = data.quantity && data.quantity > 0;
        return hasP || hasM || hasG || hasQuantity;
    }, {
        message: 'Pelo menos um campo de quantidade (P, M, G ou Quantidade Total) deve ser preenchido',
    })

    // Valida o formulário com o Zod
    const validateForm = () => {
        try {
            const parsedData = {
                ...formData,
                price: formData.price ? parseFloat(formData.price) : 0,
                p: formData.p ? parseInt(formData.p) : 0,
                m: formData.m ? parseInt(formData.m) : 0,
                g: formData.g ? parseInt(formData.g) : 0,
                quantity: formData.quantity ? parseInt(formData.quantity) : formData.p+formData.m+formData.g,
            };
            productSchema.parse(parsedData);
            return true;
        } catch (error) {
            // Se houver erro, retornamos falso
            if (error.errors) {
                console.error(error.errors);
            }
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const updated = {
                ...prev,
                [name]: value
            };

            // Se alterou p, m ou g, recalcula quantity
            if (["p", "m", "g"].includes(name)) {
                const total =
                    Number(updated.p || 0) +
                    Number(updated.m || 0) +
                    Number(updated.g || 0);

                updated.quantity = total.toString();
            }

            return updated;
        });
    };


    // Lista de Produtos
    const addProduct = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return
        }

        const newProduct = {
            ...formData,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity) || 0,
            p: parseInt(formData.p) || 0,
            m: parseInt(formData.m) || 0,
            g: parseInt(formData.g) || 0,
        };
        setProducts(prev => [newProduct, ...prev]);

        setFormData({
            name: '',
            code: '',
            description: '',
            price: '',
            quantity: '',
            p:'',
            m:'',
            g:'',
            category: '',
        });

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    // Confirmação de envio
    const handleConfirm = () => {
        console.log({products});
        setProducts([])
        setShowModal(false);
    };

    const handleCancel = () => {
        console.log('Envio cancelado!');
        setShowModal(false);
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        setShowModal(true);

    };

    // Variáveis de validação
    const isFormValid = validateForm();
    const productsNotEmpty = products.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-orange-50 p-6 flex items-center justify-center">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 via-red-900 to-black p-6">
                        <div className="flex items-center gap-3">
                            <Package className="w-8 h-8 text-white" />
                            <h1 className="text-3xl font-bold text-white">Entrada de Produtos</h1>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        <div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nome do Produto *
                                    </label>
                                    <div className="relative">
                                        <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="Ex: Camisa Ben10 Verde"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Código do Produto *
                                    </label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="code"
                                            value={formData.code}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="Ex: 1234567890123"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Categoria *</label>
                                    <Select
                                        name="category"
                                        options={categories}
                                        value={categories.find(cat => cat.value === formData.category) || null}
                                        onChange={(selectedOption) =>
                                            setFormData(prev => ({
                                                ...prev,
                                                category: selectedOption?.value || ''
                                            }))
                                        }
                                        placeholder="Selecione uma categoria"
                                    />
                                </div>

                                <div className="flex justify-between space-x-4">
                                    <div className="flex flex-col w-16">
                                        <label className="text-sm font-medium text-gray-600 mb-2">P</label>
                                        <input
                                            type="number"
                                            name="p"
                                            value={formData.p}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="flex flex-col w-16">
                                        <label className="text-sm font-medium text-gray-600 mb-2">M</label>
                                        <input
                                            type="number"
                                            name="m"
                                            value={formData.m}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="flex flex-col w-16">
                                        <label className="text-sm font-medium text-gray-600 mb-2">G</label>
                                        <input
                                            type="number"
                                            name="g"
                                            value={formData.g}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="flex flex-col w-fit">
                                        <label className="text-sm font-medium text-gray-700 mb-2">
                                            Quantidade Total
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preço Total(R$) *
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                step="0.01"
                                                min="0"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                placeholder="0,00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descrição
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="Descreva o produto..."
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={addProduct}
                                    disabled={!isFormValid}
                                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                                        isFormValid
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg hover:scale-105'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <Plus className="w-5 h-5" />
                                    Adicionar para lista de Entrada
                                </button>
                            </div>

                            {showSuccess && (
                                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                                    <Check className="w-5 h-5 text-green-600" />
                                    <span className="text-green-800 font-medium">
                                        Produto cadastrado com sucesso!
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Lista de produtos para dar entrada ({products.length})
                            </h2>
                            <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                {products.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <Package className="w-16 h-16 mx-auto mb-3 opacity-50" />
                                        <p>Nenhum produto cadastrado ainda</p>
                                    </div>
                                ) : (
                                    products.map(product => (
                                        <div
                                            key={product.id}
                                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                                                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                                                    {product.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">Código: {product.code}</p>
                                            {product.description && (
                                                <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                                            )}
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="font-semibold text-green-600">
                                                    R$ {product.price.toFixed(2)}
                                                </span>
                                                <span className="text-gray-600">
                                                    Qtd: {product.quantity || 0} | P: {product.p || 0} M: {product.m || 0} G: {product.g || 0}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={!productsNotEmpty}
                                className={`w-full mt-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${productsNotEmpty
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                                <Check/>
                                Confirmar e Enviar
                            </button>

                            {showModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Confirmar Envio</h3>
                                        <p className="text-gray-600 mb-6">
                                            Deseja realmente enviar {products.length} produto(s)?
                                        </p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleCancel}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={handleConfirm}
                                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                Confirmar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}