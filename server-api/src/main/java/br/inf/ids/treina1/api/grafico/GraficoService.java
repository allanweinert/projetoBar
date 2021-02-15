package br.inf.ids.treina1.api.grafico;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.validation.Validator;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.QueryBuilder;

import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada_;
import br.inf.ids.treina1.api.produto.Produto;

@RequestScoped
public class GraficoService {
	
	@Inject
	EntityManager em;
	
	@Inject
	Validator validator;
	
	public Grafico saidas() {
		
		
		List<Produto> produtos = new QueryBuilder(em).select(Produto.class).getResultList();
		List<String> labels = new ArrayList<String>();
		List<Integer> registros = new ArrayList<Integer>();
		for (Produto produto : produtos) {
			labels.add(produto.getNome());
			
			List<ItemEntrada> itens = new QueryBuilder(em).select(ItemEntrada.class)
					.where().field(ItemEntrada_.produto).eq(produto).getResultList();
			Integer soma = 0;
			if(itens != null && !itens.isEmpty()) {
				for (ItemEntrada item : itens) {
					soma += item.getRestante();
				}
			}
			registros.add(soma);
		}
		
		
		Grafico grafico = new Grafico();
		grafico.setDados(registros);
		grafico.setLabels(labels);
		return grafico;
	}

}
