import { Categoria } from '../../categoria/modelos/categoria';
import { UnidadeMedida } from '../../unidademedida/modelos/unidademedida';

export interface Produto {
    id?: number;
    nome?: string;
    categoria?: Categoria[];
    unidade?: UnidadeMedida[];
    estoque_minimo?: number;
    valor_venda?: number;
    valor_custo?: number;
    situacao?: string;
}
