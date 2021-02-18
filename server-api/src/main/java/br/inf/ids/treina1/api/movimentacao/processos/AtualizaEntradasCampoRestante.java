package br.inf.ids.treina1.api.movimentacao.processos;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.QueryBuilder;

import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntradaService;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada_;
import br.inf.ids.treina1.api.movimentacao.itens.ItemSaida;

@RequestScoped
public class AtualizaEntradasCampoRestante {

	@Inject ItemEntradaService itemEntradaService;
	@Inject EntityManager em;
	
	public void atualizar(ItemSaida itemSaida) {
		//Localiza item entrada em que esta sendo realizada a saída
		ItemEntrada entradaQueEstaFazendoASaida = new QueryBuilder(em)
				.select(ItemEntrada.class)
				.where()
						.field(ItemEntrada_.produto).eq(itemSaida.getProduto())
						.field(ItemEntrada_.valorUnitario).eq(itemSaida.getValorUnitario())
					.getSingleResult();

		//atualiza campo restante em item entrada
		entradaQueEstaFazendoASaida.setRestante(entradaQueEstaFazendoASaida.getRestante() - itemSaida.getQuantidade());				
		itemEntradaService.atualizar(entradaQueEstaFazendoASaida);
	}
	
}
