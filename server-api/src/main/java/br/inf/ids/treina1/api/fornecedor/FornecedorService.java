package br.inf.ids.treina1.api.fornecedor;

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

import br.inf.ids.treina1.api.fornecedor.validacao.FornecedorValidaDocumentoDuplicado;

@RequestScoped
public class FornecedorService {
	
	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	@Inject
	FornecedorValidaDocumentoDuplicado documentoDuplicado;
	
	private void validar(Fornecedor fornecedor) {
		Set<ConstraintViolation<Object>> validate = validator.validate(fornecedor);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
		documentoDuplicado.executa(fornecedor);
	}
	
	public List<Fornecedor> todas() {
		return new QueryBuilder(em)
			.select(Fornecedor.class)
			.getResultList();
	}
	
	@Transactional
	public Long gravar(Fornecedor fornecedor) {
		this.validar(fornecedor);
		em.persist(fornecedor);
		return fornecedor.getId();
	}

	public Fornecedor busca(Long id) {
		return em.find(Fornecedor.class, id);
	}

	@Transactional
	public void atualizar(Fornecedor fornecedor) {
		this.validar(fornecedor);
		em.merge(fornecedor);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}

	public PaginationResult<Fornecedor> pesquisa(Integer pagina, String valor) {
		
		return new QueryBuilder(em)
			.select(Fornecedor.class)
			.where().orGroup(w -> {
				
				if (valor!=null) {
					try {
						Long pesquisaId = Long.valueOf(valor);
						w.field(Fornecedor_.id).eq(pesquisaId);
					} catch (Exception e) {}
					w.field(Fornecedor_.razaoSocial).ilike("%"+valor+"%");
					w.field(Fornecedor_.cpf).ilike("%"+valor+"%");
					w.field(Fornecedor_.cnpj).ilike("%"+valor+"%");
				}
			})
			.pagination()
				.numRows(10)
				.page(pagina)
			.getResultList();
		
	}
	
}
