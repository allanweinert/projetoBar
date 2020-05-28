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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.inf.ids.treina1.api.movimentacao.MovimentacaoEstoque;
import br.inf.ids.treina1.api.produto.Produto;

@Entity
@Table(name = "itemsaida")
@SequenceGenerator(name = "seq_itemsaida", sequenceName = "seq_itemsaida", allocationSize = 1)
public class ItemSaida {

	@Id
	@Column(name = "itemsaidaid")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_itemsaida")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "movimentacaoestoqueid")
	@JsonIgnore
	private MovimentacaoEstoque movimentacaoEstoque;
	
	@ManyToOne
	@JoinColumn(name = "produtoId")
	@JsonIgnoreProperties({"categoria", "estoque_minimo", "unidademedida", "situacao"})
	private Produto produto;
	
	@NotNull
	@Max(100)
	@Min(1)
	private Integer quantidade;
	
	@NotNull
	@Column(precision = 5, scale = 2)
	private BigDecimal valorVenda;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public MovimentacaoEstoque getMovimentacaoEstoque() {
		return movimentacaoEstoque;
	}

	public void setMovimentacaoEstoque(MovimentacaoEstoque movimentacaoEstoque) {
		this.movimentacaoEstoque = movimentacaoEstoque;
	}

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public BigDecimal getValorVenda() {
		return valorVenda;
	}

	public void setValorVenda(BigDecimal valorVenda) {
		this.valorVenda = valorVenda;
	}
	
	
	
}
