package br.inf.ids.treina1.api.movimentacao.saldoestoque;

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

@RequestScoped
public class SaldoEstoqueService {

	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	public List<SaldoEstoque> todas() {
		return new QueryBuilder(em)
			.select(SaldoEstoque.class)
			.getResultList();
	}
	
	private void validar(SaldoEstoque SaldoEstoque) {
		Set<ConstraintViolation<Object>> validate = validator.validate(SaldoEstoque);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
	}
	
	@Transactional
	public Long gravar(SaldoEstoque SaldoEstoque) {
		this.validar(SaldoEstoque);
		em.persist(SaldoEstoque);
		return SaldoEstoque.getId();
	}

	public SaldoEstoque busca(Long id) {
		return em.find(SaldoEstoque.class, id);
	}

	@Transactional
	public void atualizar(SaldoEstoque SaldoEstoque) {
		this.validar(SaldoEstoque);
		em.merge(SaldoEstoque);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}
	
}
