import { Produto } from '../../produto/modelos/produto';

export interface ItemEntrada {
    id?: number;
    produto?: Produto;
    quantidade?: number;
    valorUnitario?: number;
    total?: number;
}
