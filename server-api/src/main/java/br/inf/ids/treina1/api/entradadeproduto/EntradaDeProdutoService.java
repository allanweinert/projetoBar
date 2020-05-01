package br.inf.ids.treina1.api.entradadeproduto;

import java.util.List;
import java.util.Set;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.QueryBuilder;
import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.pagination.PaginationResult;

@RequestScoped
public class EntradaDeProdutoService {
	
	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	private void validar(EntradaDeProduto entradaProduto) {
		Set<ConstraintViolation<Object>> validate = validator.validate(entradaProduto);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
	}

	
	public List<EntradaDeProduto> todas() {
		return new QueryBuilder(em)
			.select(EntradaDeProduto.class)
			.getResultList();
	}
	
	@Transactional
	public Long gravar(EntradaDeProduto entradaProduto) {
		this.validar(entradaProduto);
		em.persist(entradaProduto);
		return entradaProduto.getId();
	}

	public EntradaDeProduto busca(Long id) {
		return em.find(EntradaDeProduto.class, id);
	}

	@Transactional
	public void atualizar(EntradaDeProduto entradaProduto) {
		this.validar(entradaProduto);
		em.merge(entradaProduto);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}

	public PaginationResult<EntradaDeProduto> pesquisa(Integer pagina, String valor) {
		
		return new QueryBuilder(em)
			.select(EntradaDeProduto.class)
			.where().orGroup(w -> {
				
				if (valor!=null) {
					try {
						Long pesquisaId = Long.valueOf(valor);
						w.field(EntradaDeProduto_.id).eq(pesquisaId);
					} catch (Exception e) {}
					//w.field(EntradaDeProduto_.dataentrada).ilike("%"+valor+"%");
				}
			})
			.pagination()
				.numRows(10)
				.page(pagina)
			.getResultList();
		
	}
	
}
