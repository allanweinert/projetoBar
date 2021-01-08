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
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "saldoestoque")
@SequenceGenerator(name = "seq_saldoestoque", sequenceName = "seq_saldoestoque", allocationSize = 1)
@Getter
@Setter
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
	
}
