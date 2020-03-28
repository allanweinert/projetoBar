package br.inf.ids.treina1.api.pessoa.validacao;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.QueryBuilder;

import br.inf.ids.treina1.api.pessoa.Pessoa;
import br.inf.ids.treina1.api.pessoa.Pessoa_;

@RequestScoped
public class PessoaValidaCPFDuplicado {

	@Inject
	EntityManager em;
	
	public void executa(Pessoa pessoa) {
		
		if (pessoa!=null && pessoa.getCpf()!=null) {
			
			Pessoa mesmoCpf = new QueryBuilder(em)
				.select(Pessoa.class)
				.where(w -> {
					if (pessoa.getId()!=null) {
						w.field(Pessoa_.id).ne(pessoa.getId());
					}
					w.field(Pessoa_.cpf).eq(pessoa.getCpf());
				})
				.getSingleResult();
			
			if (mesmoCpf!=null) {
				throw new RuntimeException("Outra pessoa contem o mesmo CPF: " + mesmoCpf.getId() + " - " + mesmoCpf.getNome());
			}
			
		}
		
	}
	
}
