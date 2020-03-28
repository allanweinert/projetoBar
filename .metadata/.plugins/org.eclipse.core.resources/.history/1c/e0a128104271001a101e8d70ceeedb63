package br.inf.ids.treina1.api.municipio;

import java.util.Set;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;

@RequestScoped
public class MunicipioService {

	@Inject
	EntityManager em;

	@Inject
	Validator validator;

	private void validar(Municipio municipio) {
		Set<ConstraintViolation<Municipio>> validate = validator.validate(municipio);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
	}
	
	@Transactional
	public Long gravar(Municipio municipio) {
		validar(municipio);
		em.persist(municipio);
		return municipio.getId();
	}
	
	public Municipio busca(Long id) {
		return em.find(Municipio.class, id);
	}
	
	@Transactional
	public void atualizar(Municipio municipio) {
		this.validar(municipio);
		em.merge(municipio);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}
	
}
