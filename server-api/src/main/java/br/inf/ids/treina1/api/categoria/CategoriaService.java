package br.inf.ids.treina1.api.categoria;

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

import br.inf.ids.treina1.api.categoria.Categoria;
import br.inf.ids.treina1.api.categoria.Categoria_;

@RequestScoped
public class CategoriaService {
	
	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	private void validar(Categoria categoria) {
		Set<ConstraintViolation<Object>> validate = validator.validate(categoria);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
	}
	

	public List<Categoria> tudo() {
		return new QueryBuilder(em)
			.select(Categoria.class)
			.getResultList();
	}
	
	@Transactional
	public Long gravar(Categoria categoria) {
		this.validar(categoria);
		em.persist(categoria);
		return categoria.getId();
	}

	public Categoria busca(Long id) {
		return em.find(Categoria.class, id);
	}

	@Transactional
	public void atualizar(Categoria categoria) {
		this.validar(categoria);
		em.merge(categoria);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}
	
	public PaginationResult<Categoria> pesquisa(Integer pagina, String valor) {
		
		return new QueryBuilder(em)
			.select(Categoria.class)
			.where().orGroup(w -> {
				
				if (valor!=null && !valor.isEmpty()) {
					try {
						Long produtoId = Long.valueOf(valor);
						w.field(Categoria_.id).eq(produtoId);
					} catch (Exception e) {}
					w.field(Categoria_.nome).ilike("%"+valor+"%");
				}
			})
			.pagination()
				.page(pagina)
			.getResultList();
			
		}

}
