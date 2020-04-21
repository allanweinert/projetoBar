import { FornecedorTelefone } from './fornecedor-telefone';
import { Municipio } from '../../municipio/modelos/municipio';

export interface Fornecedor {
    id?: number;
    nome?: string;
    nascimento?: Date;
    municipioDeNascimento?: Municipio;
    cpf?: string;
    sexo?: string;
    telefones?: FornecedorTelefone[];
}
