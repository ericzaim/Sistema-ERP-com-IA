export interface SaidaInterface {

    data_venda: Date;
    valor_total: number;
    vendedor: number;
    itens: Array<itens>;
}

interface itens{
    produto:number;
    quantidade:number;

}
