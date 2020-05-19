package br.inf.ids.treina1.api.entradadeproduto.itens;

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
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.inf.ids.treina1.api.entradadeproduto.EntradaDeProduto;
import br.inf.ids.treina1.api.produto.Produto;


@Entity
@Table(name = "ITENSENTRADA")
@SequenceGenerator(name = "SEQ_ITENSENTRADA", sequenceName = "SEQ_ITENSENTRADA", allocationSize = 1)

public class ItensDaEntrada {


	@Id
	@Column(name = "ITENSENTRADAID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ITENSENTRADA")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "ENTRADAPRODUTOID")
	@JsonIgnore
	private EntradaDeProduto entrada;
	
	@ManyToOne
	@JoinColumn(name = "PRODUTOID")
	@JsonIgnoreProperties({"categoria", "estoque_minimo", "unidademedida", "situacao"})
	private Produto produto;
	
	@NotNull
	private Integer quantidade;
	
	@NotNull
	private BigDecimal valorcusto;
	
	@NotNull
	private BigDecimal valorvenda;
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EntradaDeProduto getEntrada() {
		return entrada;
	}

	public void setEntrada(EntradaDeProduto entrada) {
		this.entrada = entrada;
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

	public BigDecimal getValorcusto() {
		return valorcusto;
	}

	public void setValorcusto(BigDecimal valorcusto) {
		this.valorcusto = valorcusto;
	}

	public BigDecimal getValorvenda() {
		return valorvenda;
	}

	public void setValorvenda(BigDecimal valorvenda) {
		this.valorvenda = valorvenda;
	}
	
}
