package br.inf.ids.treina1.api.movimentacao;

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

import br.inf.ids.treina1.api.movimentacao.validacao.MovimentacaoEstoqueValidaItemComTipo;

@RequestScoped
public class MovimentacaoEstoqueService {
	
	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	@Inject
	MovimentacaoEstoqueValidaItemComTipo movimentacaoEstoqueValidaItemComTipo;
	
	private void validar(MovimentacaoEstoque movimentacaoEstoque) {
		Set<ConstraintViolation<Object>> validate = validator.validate(movimentacaoEstoque);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
		movimentacaoEstoqueValidaItemComTipo.validar(movimentacaoEstoque);
	}

	
	public List<MovimentacaoEstoque> todas() {
		return new QueryBuilder(em)
			.select(MovimentacaoEstoque.class)
			.getResultList();
	}
	
	@Transactional
	public Long gravar(MovimentacaoEstoque movimentacaoEstoque) {
		this.validar(movimentacaoEstoque);
		em.persist(movimentacaoEstoque);
		return movimentacaoEstoque.getId();
	}

	public MovimentacaoEstoque busca(Long id) {
		return em.find(MovimentacaoEstoque.class, id);
	}

	@Transactional
	public void atualizar(MovimentacaoEstoque movimentacaoEstoque) {
		this.validar(movimentacaoEstoque);
		em.merge(movimentacaoEstoque);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}

	public PaginationResult<MovimentacaoEstoque> pesquisa(Integer pagina, String valor) {
		
		return new QueryBuilder(em)
			.select(MovimentacaoEstoque.class)
			.where().orGroup(w -> {
				
				if (valor!=null) {
					try {
						Long pesquisaId = Long.valueOf(valor);
						w.field(MovimentacaoEstoque_.id).eq(pesquisaId);
					} catch (Exception e) {}
					//w.field(MovimentacaoEstoque_.tipo).ilike("%"+valor+"%");
				}
			})
			.pagination()
				.numRows(10)
				.page(pagina)
			.getResultList();
		
	}
	
}
