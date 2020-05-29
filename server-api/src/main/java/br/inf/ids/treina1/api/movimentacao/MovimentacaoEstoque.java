package br.inf.ids.treina1.api.movimentacao;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.inf.ids.treina1.api.fornecedor.Fornecedor;
import br.inf.ids.treina1.api.movimentacao.enums.MovimentacaoEstoqueTipo;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada;
import br.inf.ids.treina1.api.movimentacao.itens.ItemSaida;


@Entity

@SequenceGenerator(name = "seq_movimentacao", sequenceName = "seq_movimentacao", allocationSize = 1)
@Table(name = "movimentacaoestoque")
public class MovimentacaoEstoque {
	
	@Id
	@Column(name = "movimentacaoestoqueid")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_movimentacao")
	private Long id;
	
	@Enumerated(EnumType.STRING)
	private MovimentacaoEstoqueTipo tipo;
	
	@NotNull
	private LocalDate data;
	
	@ManyToOne
	@JoinColumn(name = "fornecedorid")
	@JsonIgnoreProperties({"cnpj","cpf","telefones"})
	private Fornecedor fornecedor;
	
	@Valid
	@OneToMany(mappedBy = "movimentacaoEstoque", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ItemEntrada> itensEntrada;

	@Valid
	@OneToMany(mappedBy = "movimentacaoEstoque", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ItemSaida> itensSaida;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public MovimentacaoEstoqueTipo getTipo() {
		return tipo;
	}

	public void setTipo(MovimentacaoEstoqueTipo tipo) {
		this.tipo = tipo;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public Fornecedor getFornecedor() {
		return fornecedor;
	}

	public void setFornecedor(Fornecedor fornecedor) {
		this.fornecedor = fornecedor;
	}

	public List<ItemEntrada> getItensEntrada() {
		return itensEntrada;
	}

	public void setItensEntrada(List<ItemEntrada> itensEntrada) {
		this.itensEntrada = itensEntrada;
	}

	public List<ItemSaida> getItensSaida() {
		return itensSaida;
	}

	public void setItensSaida(List<ItemSaida> itensSaida) {
		this.itensSaida = itensSaida;
	}
	
	

}
