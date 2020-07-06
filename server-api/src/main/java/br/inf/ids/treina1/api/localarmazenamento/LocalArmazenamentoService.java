package br.inf.ids.treina1.api.localarmazenamento;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.QueryBuilder;
import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.pagination.PaginationResult;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;


@RequestScoped
public class LocalArmazenamentoService {

    @Inject
    EntityManager em;

    @Inject
    Validator validator;

    private void validar(LocalArmazenamento localarmazenamento) {
        Set<ConstraintViolation<Object>> validate = validator.validate(localarmazenamento);
        if (!validate.isEmpty()) {
            throw new ConstraintViolationException(validate);
        }
    }


    public List<LocalArmazenamento> tudo() {
        return new QueryBuilder(em)
                .select(LocalArmazenamento.class)
                .getResultList();
    }

    @Transactional
    public Long gravar(LocalArmazenamento localarmazenamento) {
        this.validar(localarmazenamento);
        em.persist(localarmazenamento);
        return localarmazenamento.getId();
    }

    public LocalArmazenamento busca(Long id) {
        return em.find(LocalArmazenamento.class, id);
    }

    @Transactional
    public void atualizar(LocalArmazenamento localarmazenamento) {
        this.validar(localarmazenamento);
        em.merge(localarmazenamento);
    }

   @Transactional
    public void remover(Long id) {
        em.remove(busca(id));
    }

    public PaginationResult<LocalArmazenamento> pesquisa(Integer pagina, String valor) {

        return new QueryBuilder(em)
                .select(LocalArmazenamento.class)
                .where().orGroup(w -> {

                    if (valor != null && !valor.isEmpty()) {
                        try {
                            Long localArmazenamentoId = Long.valueOf(valor);
                            w.field(LocalArmazenamento_.id).eq(localArmazenamentoId);
                        } catch (Exception e) {
                        }
                        w.field(LocalArmazenamento_.nome).ilike("%" + valor + "%");
                    }
                })
                .pagination()
                .page(pagina)
                .getResultList();

    }

}
