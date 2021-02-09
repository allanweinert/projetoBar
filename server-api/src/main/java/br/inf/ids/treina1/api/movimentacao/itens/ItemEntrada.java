package br.inf.ids.treina1.api.movimentacao.itens;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.inf.ids.treina1.api.movimentacao.MovimentacaoEstoque;
import br.inf.ids.treina1.api.produto.Produto;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "itementrada")
@SequenceGenerator(name = "seq_itementrada", sequenceName = "seq_itementrada", allocationSize = 1)
@Getter @Setter
public class ItemEntrada {

	@Id
	@Column(name = "itementradaid")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_itementrada")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "movimentacaoestoqueid")
	@JsonIgnore
	private MovimentacaoEstoque movimentacaoEstoque;
	
	@ManyToOne
	@JoinColumn(name = "produtoid")
	private Produto produto;
	
	@NotNull
	@Max(100)
	@Min(1)
	private Integer quantidade;
	
	@NotNull
	@Column(precision = 5, scale = 2)
	private BigDecimal valorUnitario;
	
	@NotNull
	@Column(precision = 5, scale = 2)
	private BigDecimal total;

	@NotNull
	private Integer restante;
	
}
