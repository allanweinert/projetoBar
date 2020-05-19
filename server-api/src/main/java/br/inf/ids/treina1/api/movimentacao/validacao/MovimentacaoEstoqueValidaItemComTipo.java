package br.inf.ids.treina1.api.movimentacao.validacao;

import javax.enterprise.context.RequestScoped;

import br.inf.ids.treina1.api.movimentacao.MovimentacaoEstoque;
import br.inf.ids.treina1.api.movimentacao.enums.MovimentacaoEstoqueTipo;

@RequestScoped
public class MovimentacaoEstoqueValidaItemComTipo {

	public void validar(MovimentacaoEstoque movimentacao) {
		if (MovimentacaoEstoqueTipo.ENTRADA.equals(movimentacao.getTipo())) {
			if (movimentacao.getItensSaida()!=null || !movimentacao.getItensSaida().isEmpty()) {
				throw new RuntimeException("Se movimentação for do tipo entrada não podem ser informados itens de saída");
			}
		} else if (MovimentacaoEstoqueTipo.SAIDA.equals(movimentacao.getTipo())) {
			if (movimentacao.getItensSaida()!=null || !movimentacao.getItensSaida().isEmpty()) {
				throw new RuntimeException("Se movimentação for do tipo saída não podem ser informados itens de entrada");
			}
		} 
	}
	
}
