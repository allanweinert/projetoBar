package br.inf.ids.treina1.api.materia;

import java.util.List;
import java.util.Set;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.Validator;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.QueryBuilder;

@RequestScoped
public class MateriaService {

	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	private void validar(Materia materia) {
		Set<ConstraintViolation<Object>> validate = validator.validate(materia);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
	}
	

	public List<Materia> tudo() {
		return new QueryBuilder(em)
			.select(Materia.class)
			.getResultList();
	}
	
	@Transactional
	public Long gravar(@Valid Materia materia) {
		//this.validar(materia);
		em.persist(materia);
		return materia.getId();
	}

	public Materia busca(Long id) {
		return em.find(Materia.class, id);
	}

	@Transactional
	public void atualizar(Materia materia) {
		this.validar(materia);
		em.merge(materia);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}

	
}
