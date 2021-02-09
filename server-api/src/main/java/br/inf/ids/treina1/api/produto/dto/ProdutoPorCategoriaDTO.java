package br.inf.ids.treina1.api.produto.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoPorCategoriaDTO {
	
	Long id;
	String nome;
	Integer restante;
	BigDecimal valorUnitario;

}
