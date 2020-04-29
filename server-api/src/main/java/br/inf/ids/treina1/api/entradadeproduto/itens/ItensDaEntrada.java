package br.inf.ids.treina1.api.entradadeproduto.itens;

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
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.inf.ids.treina1.api.entradadeproduto.EntradaDeProduto;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ITENSENTRADA")
@SequenceGenerator(name = "SEQ_ITENSENTRADA", sequenceName = "SEQ_ITENSENTRADA", allocationSize = 1)
@Getter @Setter
public class ItensDaEntrada {

	@Id
	@Column(name = "ITENSENTRADAID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ITENSENTRADA")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "ENTRADAPRODUTOID")
	@JsonIgnore
	private EntradaDeProduto entrada;
	
	@NotNull
	@Size(max = 8)
	private Integer quantidade;
	
	@NotNull
	@Size(max = 8)
	private Integer valorcusto;
	
	@NotNull
	@Size(max = 8)
	private Integer valorvenda;
	
}
