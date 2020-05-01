import { Produto } from '../../produto/modelos/produto';

export interface ItensEntrada {
    id?: number;
    produto?: Produto;
    quantidade?: string;
    valorcusto?: string;
    valorvenda?: string;
}
