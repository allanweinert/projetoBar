import { PessoaTelefone } from './pessoa-telefone';
import { Municipio } from '../../municipio/modelos/municipio';

export interface Pessoa {
    id?: number;
    nome?: string;
    nascimento?: Date;
    municipioDeNascimento?: Municipio;
    cpf?: string;
    sexo?: string;
    telefones?: PessoaTelefone[];
}
