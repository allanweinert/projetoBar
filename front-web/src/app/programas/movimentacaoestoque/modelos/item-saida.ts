import { Produto } from '../../produto/modelos/produto';

export interface ItemSaida {
    id?: number;
    produto?: Produto;
    quantidade?: string;
    valorUnitario?: number;
    total?: number;
}
