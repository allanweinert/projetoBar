package br.inf.ids.treina1.api.movimentacao.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SaldoEstoqueDTO {
	
	String localArmazenamento;
	String produto;
	Integer restante;

}
