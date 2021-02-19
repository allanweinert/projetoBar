package br.inf.ids.treina1.api.grafico;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Instance;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.validation.Validator;

import br.inf.ids.treina1.api.grafico.item.GraficoRestante;
import br.inf.ids.treina1.api.grafico.item.GraficoRestante2;

@RequestScoped
public class GraficoService {
	
	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	@Inject Instance<GraficoInterface> graficos;
	
	@Inject GraficoRestante graficoRestante;
	@Inject GraficoRestante2 graficoRestante02;
	
	public List<Grafico> todos() {
		//for (GraficoInterface graficoInterface : graficos.iterator()) {
		//}
		List<Grafico> graficos = new ArrayList<Grafico>();
		graficos.add(graficoRestante.buscar());
		graficos.add(graficoRestante02.buscar());
		return graficos;
	}

}
