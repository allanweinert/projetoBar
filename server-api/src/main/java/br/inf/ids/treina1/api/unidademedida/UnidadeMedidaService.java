package br.inf.ids.treina1.api.unidademedida;

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
public class UnidadeMedidaService {
	
	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	private void validar(UnidadeMedida unidademedida) {
		Set<ConstraintViolation<Object>> validate = validator.validate(unidademedida);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
	}
	

	public List<UnidadeMedida> tudo() {
		return new QueryBuilder(em)
			.select(UnidadeMedida.class)
			.getResultList();
	}
	
	@Transactional
	public Long gravar(UnidadeMedida unidademedida) {
		this.validar(unidademedida);
		em.persist(unidademedida);
		return unidademedida.getId();
	}

	public UnidadeMedida busca(Long id) {
		return em.find(UnidadeMedida.class, id);
	}

	@Transactional
	public void atualizar(UnidadeMedida unidademedida) {
		this.validar(unidademedida);
		em.merge(unidademedida);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}
	
	public PaginationResult<UnidadeMedida> pesquisa(Integer pagina, String valor) {
		
		return new QueryBuilder(em)
			.select(UnidadeMedida.class)
			.where().orGroup(w -> {
				
				if (valor!=null && !valor.isEmpty()) {
					try {
						Long unidadeMedidaId = Long.valueOf(valor);
						w.field(UnidadeMedida_.id).eq(unidadeMedidaId);
					} catch (Exception e) {}
					w.field(UnidadeMedida_.nome).ilike("%"+valor+"%");
				}
			})
			.pagination()
				.page(pagina)
			.getResultList();
			
		}

}
