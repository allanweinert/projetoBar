import { Produto } from '../../produto/modelos/produto';
import { Fornecedor } from '../../fornecedor/modelos/fornecedor';

export interface ItemEntrada {
    id?: number;
    fornecedor?: Fornecedor;
    produto?: Produto;
    quantidade?: number;
    valorCusto?: number;
    valorVenda?: number;
}
