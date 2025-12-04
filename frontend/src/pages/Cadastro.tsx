import React, { useState } from 'react';
import {Package, DollarSign, FileText, Tag, Check, TrendingUp, TrendingDown, Boxes, Barcode} from 'lucide-react';
import { z } from 'zod';
import {CadastroService} from "@/services/ProductServices/CadastroService.ts";
import {ICadastroForm} from "@/interfaces/ProductsInterface.ts";

const cadastroService:CadastroService = new CadastroService();

const options = [
    { value: 'Camisa', label: 'Camisa' },
    { value: 'Bermuda', label: 'Bermuda' },
    { value: 'Blusa', label: 'Blusa' },
    { value: 'Intima', label: 'Roupa Intima' },
    { value: 'Vestido', label: 'Vestido' },
    { value: 'Macacao', label: 'Macacão' },
];

const productSchema = z.object({
    name: z.string().min(1, { message: 'O nome do produto é obrigatório' }),
    categoria: z.string().min(1, { message: 'A categoria é obrigatória' }),
    preco_custo: z.number().min(0.01, { message: 'O preço de custo deve ser maior que 0' }),
    preco_venda: z.number().min(0.01, { message: 'O preço de venda deve ser maior que 0' }),
    estoqueAtual: z.number().min(0, { message: 'O estoque atual é obrigatório' }),
    estoqueMinimo: z.number().min(0, { message: 'O estoque mínimo é obrigatório' }),
    description: z.string().optional(),
    barcode: z.string().optional(),
});

type Errors = {
    name?: string;
    categoria?: string;
    preco_custo?: string;
    preco_venda?: string;
    estoqueAtual?: string;
    estoqueMinimo?: string;
        description?: string;
    barcode?: string;
};

const Cadastro = () => {
    const [product, setProduct] = useState<ICadastroForm>({
        name: '',
        categoria: '',
        preco_custo: '',
        preco_venda: '',
        estoqueAtual: '',
        estoqueMinimo: '',
        description: '',
        barcode: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        if (errors[name as keyof Errors]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const handleCategoryChange = (value: string) => {
        setProduct({ ...product, categoria: value });
        if (errors.categoria) {
            setErrors({ ...errors, categoria: undefined });
        }
    };

    const validateForm = () => {
        try {
            productSchema.parse({
                name: product.name,
                categoria: product.categoria,
                preco_custo: parseFloat(product.preco_custo),
                preco_venda: parseFloat(product.preco_venda),
                estoqueAtual: product.estoqueAtual ? parseInt(product.estoqueAtual) : 0,
                estoqueMinimo: product.estoqueMinimo ? parseInt(product.estoqueMinimo) : 0,
                description: product.description,
                barcode: product.barcode,
            });
            return true;
        } catch (err) {
            return false;
        }
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const validatedProduct = productSchema.parse({
                name: product.name,
                categoria: product.categoria,
                preco_custo: parseFloat(product.preco_custo) ? parseFloat(product.preco_custo) : 0.00,
                preco_venda: parseFloat(product.preco_venda) ? parseFloat(product.preco_venda) : 0.00,
                estoqueAtual: parseInt(product.estoqueAtual) ? parseInt(product.estoqueAtual) : 0,
                estoqueMinimo: parseInt(product.estoqueMinimo) ? parseInt(product.estoqueMinimo) : 0,
                description: product.description,
                barcode: product.barcode,
            });
            console.log(validatedProduct);
            const data = cadastroService.salvarProduct(validatedProduct);
            console.log(data);
            if(data.status == 200){
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                setProduct({
                    name: '',
                    categoria: '',
                    preco_custo: '',
                    preco_venda: '',
                    estoqueAtual: '',
                    estoqueMinimo: '',
                    description: '',
                    barcode: '',
                });
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors = err.errors.reduce((acc: Errors, curr) => {
                    acc[curr.path[0] as keyof Errors] = curr.message;
                    return acc;
                }, {});
                setErrors(newErrors);
            }
        }
        setIsSubmitting(false);
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-orange-50 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 via-red-900 to-black p-6">
                        <div className="flex items-center gap-3">
                            <Package className="w-8 h-8 text-white" />
                            <h1 className="text-3xl font-bold text-white">Cadastro de Produto</h1>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Nome e Categoria */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome do Produto *
                                </label>
                                <div className="relative">
                                    <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={product.name}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                            errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Ex: Camisa Ben10 Verde"
                                    />
                                </div>
                                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categoria *
                                </label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                                    <select
                                        name="categoria"
                                        value={product.categoria}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent appearance-none ${
                                            errors.categoria ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Selecione uma categoria</option>
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.categoria && <p className="text-red-600 text-xs mt-1">{errors.categoria}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Código de Barras
                            </label>
                            <div className="relative">
                                <Barcode className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="barcode"
                                    value={product.barcode}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                        errors.barcode ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Ex: 9999999999999"
                                />
                            </div>
                            {errors.barcode && <p className="text-red-600 text-xs mt-1">{errors.barcode}</p>}
                        </div>

                        {/* Preços */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preço de Custo (R$) *
                                </label>
                                <div className="relative">
                                    <TrendingDown className="absolute left-3 top-3 w-5 h-5 text-red-400" />
                                    <input
                                        type="number"
                                        name="preco_custo"
                                        value={product.preco_custo}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0.01"
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                            errors.preco_custo ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                {errors.preco_custo && <p className="text-red-600 text-xs mt-1">{errors.preco_custo}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preço de Venda (R$) *
                                </label>
                                <div className="relative">
                                    <TrendingUp className="absolute left-3 top-3 w-5 h-5 text-green-400" />
                                    <input
                                        type="number"
                                        name="preco_venda"
                                        value={product.preco_venda}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0.01"
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                            errors.preco_venda ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                {errors.preco_venda && <p className="text-red-600 text-xs mt-1">{errors.preco_venda}</p>}
                            </div>
                        </div>

                        {/* Estoque */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Estoque Atual *
                                </label>
                                <div className="relative">
                                    <Boxes className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="number"
                                        name="estoqueAtual"
                                        value={product.estoqueAtual}
                                        onChange={handleChange}
                                        min="0"
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                            errors.estoqueAtual ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0"
                                    />
                                </div>
                                {errors.estoqueAtual && <p className="text-red-600 text-xs mt-1">{errors.estoqueAtual}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Estoque Mínimo *
                                </label>
                                <div className="relative">
                                    <Boxes className="absolute left-3 top-3 w-5 h-5 text-orange-400" />
                                    <input
                                        type="number"
                                        name="estoqueMinimo"
                                        value={product.estoqueMinimo}
                                        onChange={handleChange}
                                        min="0"
                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                            errors.estoqueMinimo ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0"
                                    />
                                </div>
                                {errors.estoqueMinimo && <p className="text-red-600 text-xs mt-1">{errors.estoqueMinimo}</p>}
                            </div>
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descrição
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <textarea
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                        errors.description ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Descreva o produto..."
                                />
                            </div>
                            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
                        </div>

                        {/* Botão */}
                        <button
                            onClick={handleSubmit}
                            disabled={!validateForm() || isSubmitting}
                            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                                validateForm() && !isSubmitting
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <Package className="w-5 h-5" />
                            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Produto'}
                        </button>

                        {showSuccess && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
                                <Check className="w-5 h-5 text-green-600" />
                                <span className="text-green-800 font-medium">
                                    Produto cadastrado com sucesso!
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;