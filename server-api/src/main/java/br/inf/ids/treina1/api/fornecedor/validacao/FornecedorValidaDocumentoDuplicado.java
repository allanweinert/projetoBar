package br.inf.ids.treina1.api.fornecedor.validacao;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.QueryBuilder;

import br.inf.ids.treina1.api.fornecedor.Fornecedor;
import br.inf.ids.treina1.api.fornecedor.Fornecedor_;

@RequestScoped
public class FornecedorValidaDocumentoDuplicado {

	@Inject
	EntityManager em;
	
	public void executa(Fornecedor fornecedor) {
		
		if (fornecedor!=null && fornecedor.getCnpj()!=null) {
			
			Fornecedor mesmoCnpj = new QueryBuilder(em)
				.select(Fornecedor.class)
				.where(w -> {
					if (fornecedor.getId()!=null) {
						w.field(Fornecedor_.id).ne(fornecedor.getId());
					}
					w.field(Fornecedor_.cnpj).eq(fornecedor.getCnpj());
				})
				.getSingleResult();
			
			if (mesmoCnpj!=null) {
				throw new RuntimeException("Outro fornecedor contem o mesmo número de documento: " + mesmoCnpj.getId() + " - " + mesmoCnpj.getRazaoSocial());
			}
			
		}
		
	}
	
}
