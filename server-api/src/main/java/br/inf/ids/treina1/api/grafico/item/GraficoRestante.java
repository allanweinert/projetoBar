package br.inf.ids.treina1.api.grafico.item;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.QueryBuilder;

import br.inf.ids.treina1.api.grafico.Grafico;
import br.inf.ids.treina1.api.grafico.GraficoInterface;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada_;
import br.inf.ids.treina1.api.produto.Produto;

@RequestScoped
public class GraficoRestante implements GraficoInterface {

	@Inject EntityManager em;
	
	@Override
	public Grafico buscar() {
		//Lista todos os produtos do banco
		List<Produto> produtos = new QueryBuilder(em).select(Produto.class).getResultList();
		List<String> labels = new ArrayList<String>();
		List<Integer> registros = new ArrayList<Integer>();
		
		if (produtos!=null && !produtos.isEmpty()) {
			//Percore a lista de produtos encontrada
			for (Produto produto : produtos) {
				//Para cada produto busca se tem entradas
				List<ItemEntrada> itens = new QueryBuilder(em).select(ItemEntrada.class)
						.where().field(ItemEntrada_.produto).eq(produto).getResultList();
				Integer soma = 0;
				if(itens != null && !itens.isEmpty()) {
					for (ItemEntrada item : itens) {
						//soma o restante de cada produto
						soma += item.getRestante();
					}
				}
				//Só retorna produtos que tem entradas
				if (soma>0) {
					labels.add(produto.getNome());
					registros.add(soma);
				}
			}
		
		}
		
		Grafico grafico = new Grafico();
		grafico.setDados(registros);
		grafico.setLabels(labels);
		return grafico;
	}

}
