import { Produto } from '../../produto/modelos/produto';

export interface ItemSaida {
    id?: number;
    produto?: Produto;
    quantidade?: number;
    valorUnitario?: number;
    total?: number;
}
