import { Fornecedor } from '../../fornecedor/modelos/fornecedor';
import { ItensEntrada } from './itens-entrada';


export interface EntradaProduto {
    id?: number;
    dataentrada?: Date;
    fornecedor?: Fornecedor;
    itensdaentrada?: ItensEntrada[];
    tipoentrada?: string;
}
