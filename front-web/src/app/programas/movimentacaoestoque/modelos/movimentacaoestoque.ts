import { ItemSaida } from './item-saida';
import { ItemEntrada } from './item-entrada';

export interface MovimentacaoEstoque {
    id?: number;
    tipo?: string;
    data?: Date;
    itensEntrada?: ItemEntrada[];
    itensSaida?: ItemSaida[];
}
