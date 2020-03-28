package br.inf.ids.treina1.api.curso;

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
public class CursoService {

	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	private void validar(Curso curso) {
		Set<ConstraintViolation<Object>> validate = validator.validate(curso);
		if (!validate.isEmpty()) {
			throw new ConstraintViolationException(validate);
		}
	}
	

	public List<Curso> tudo() {
		return new QueryBuilder(em)
			.select(Curso.class)
			.getResultList();
	}
	
	@Transactional
	public Long gravar(Curso curso) {
		this.validar(curso);
		em.persist(curso);
		return curso.getId();
	}

	public Curso busca(Long id) {
		return em.find(Curso.class, id);
	}

	@Transactional
	public void atualizar(Curso materia) {
		this.validar(materia);
		em.merge(materia);
	}
	
	@Transactional
	public void remover(Long id) {
		em.remove(busca(id));
	}
	
}
