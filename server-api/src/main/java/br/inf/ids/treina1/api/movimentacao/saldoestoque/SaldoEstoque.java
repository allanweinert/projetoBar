package br.inf.ids.treina1.api.movimentacao.saldoestoque;

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

import br.inf.ids.treina1.api.localarmazenamento.LocalArmazenamento;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada;

@Entity
@Table(name = "saldoestoque")
@SequenceGenerator(name = "seq_saldoestoque", sequenceName = "seq_saldoestoque", allocationSize = 1)
public class SaldoEstoque {

	@Id
	@Column(name = "saldoestoqueid")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_saldoestoque")
	private Long id;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "localarmazenamentoid")
	private LocalArmazenamento localArmazenamento;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "itementradaid")
	private ItemEntrada itemEntrada;
	
	@NotNull
	private Integer restante;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalArmazenamento getLocalArmazenamento() {
		return localArmazenamento;
	}

	public void setLocalArmazenamento(LocalArmazenamento localArmazenamento) {
		this.localArmazenamento = localArmazenamento;
	}

	public ItemEntrada getItemEntrada() {
		return itemEntrada;
	}

	public void setItemEntrada(ItemEntrada itemEntrada) {
		this.itemEntrada = itemEntrada;
	}

	public Integer getRestante() {
		return restante;
	}

	public void setRestante(Integer restante) {
		this.restante = restante;
	}
	
}
