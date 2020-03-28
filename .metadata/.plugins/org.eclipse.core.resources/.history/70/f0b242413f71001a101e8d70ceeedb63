package br.inf.ids.treina1.api.municipio;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.QueryBuilder;

import br.inf.ids.treina1.api.municipio.uf.UF;

@RequestScoped
public class MunicipioPesquisaPorUF {

	@Inject
	EntityManager em;
	
	public List<Municipio> executar(UF uf) {
		
		return new QueryBuilder(em)
			.select(Municipio.class)
			.where()
				.field(Municipio_.uf).eq(uf)
			.order()
				.asc(Municipio_.nome)
			.getResultList();
		
	}
	
}
