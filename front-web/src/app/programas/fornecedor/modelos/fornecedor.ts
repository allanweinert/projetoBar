import { FornecedorTelefone } from './fornecedor-telefone';

export interface Fornecedor {
    id?: number;
    razaoSocial?: string;
    nomeFantasia?: string;
    cpf?: string;
    cnpj?: string;
    telefones?: FornecedorTelefone[];
}
