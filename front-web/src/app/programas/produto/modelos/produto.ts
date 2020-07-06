import {Categoria} from '../../categoria/modelos/categoria';

export interface Produto {
  id?: number;
  nome?: string;
  categoria?: Categoria[];
  estoque_minimo?: number;
  valor_venda?: number;
  valor_custo?: number;
  situacao?: string;
}
