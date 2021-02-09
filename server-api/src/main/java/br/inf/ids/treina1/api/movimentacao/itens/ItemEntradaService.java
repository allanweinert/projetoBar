package br.inf.ids.treina1.api.movimentacao.itens;

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
public class ItemEntradaService {

	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	public List<ItemEntrada> todas() {
		return new QueryBuilder(em)
			.select(ItemEntrada.class)
			.getResultList();
	}
	
	private void validar(ItemEntrada itemEntrada) {
		Set<ConstraintViolation<Object>> validate = validator.validate(itemEntrada);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
	}
	
	@Transactional
	public Long gravar(ItemEntrada itemEntrada) {
		this.validar(itemEntrada);
		em.persist(itemEntrada);
		return itemEntrada.getId();
	}

	public ItemEntrada busca(Long id) {
		return em.find(ItemEntrada.class, id);
	}

	@Transactional
	public void atualizar(ItemEntrada itemEntrada) {
		this.validar(itemEntrada);
		em.merge(itemEntrada);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}
	
}
