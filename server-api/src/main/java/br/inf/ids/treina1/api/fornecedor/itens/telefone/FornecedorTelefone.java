package br.inf.ids.treina1.api.fornecedor.itens.telefone;

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
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.inf.ids.treina1.api.fornecedor.Fornecedor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "fornecedortelefone")
@Getter @Setter
@SequenceGenerator(name = "SEQ_FORNECEDORTELEFONE", sequenceName = "SEQ_FORNECEDORTELEFONE", allocationSize = 1)
public class FornecedorTelefone {

	@Id
	@Column(name = "fornecedortelefoneid")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FORNECEDORTELEFONE")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "fornecedorid")
	@JsonIgnore
	private Fornecedor fornecedor;
	
	@NotNull
	@Size(max = 50)
	private String tipo;
	
	@NotNull
	@Size(min = 10, max = 11, message = "tamanho deve ser entre 10 e 11")
	@Pattern(regexp = ".*([0-9])", message = "permite apenas números")
	private String numero;
	
}
