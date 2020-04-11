export interface Produto {
    id?: number;
    nome?: string;
    marca?: string;
    unidade?: string;
    estoque_minimo?: number;
    valor_venda?: number;
    valor_custo?: number;
    situacao?:string;
}
