import { Fornecedor } from '../../fornecedor/modelos/fornecedor';
import { ItensEntrada } from './itens-entrada';


export interface EntradaProduto {
    id?: number;
    fornecedor?: Fornecedor;
    data?: Date;
    itens?: ItensEntrada[];
}
