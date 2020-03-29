package br.inf.ids.treina1.api.produto;

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

import br.inf.ids.treina1.api.produto.Produto;
import br.inf.ids.treina1.api.produto.Produto_;

@RequestScoped
public class ProdutoService {

	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	private void validar(Produto produto) {
		Set<ConstraintViolation<Object>> validate = validator.validate(produto);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
	}
	

	public List<Produto> tudo() {
		return new QueryBuilder(em)
			.select(Produto.class)
			.getResultList();
	}
	
	@Transactional
	public Long gravar(Produto produto) {
		this.validar(produto);
		em.persist(produto);
		return produto.getId();
	}

	public Produto busca(Long id) {
		return em.find(Produto.class, id);
	}

	@Transactional
	public void atualizar(Produto produto) {
		this.validar(produto);
		em.merge(produto);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}
	
	public PaginationResult<Produto> pesquisa(Integer pagina, String valor) {
			
		return new QueryBuilder(em)
			.select(Produto.class)
			.where().orGroup(w -> {
				
				if (valor!=null) {
					try {
						Long produtoId = Long.valueOf(valor);
						w.field(Produto_.id).eq(produtoId);
					} catch (Exception e) {}
					w.field(Produto_.nome).ilike("%"+valor+"%");
				}
			})
			.pagination()
				.numRows(10)
				.page(pagina)
			.getResultList();
			
		}
	
}
