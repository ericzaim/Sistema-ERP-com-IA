export interface IProducts{
    name:string;
    description:string;
    categoria:string;
    custo:number;
    venda:number;
    estoqueAtual:number;
    estoqueMinimo:number;
    tamanho:string;
}

export interface ICadastroForm{
    name: string,
    categoria: string,
    preco_custo: string,
    preco_venda: string,
    estoqueAtual: string,
    estoqueMinimo: string,
    description: string,
    barcode: string,
}