package br.inf.ids.treina1.api.unidademedida;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.inf.ids.treina1.api.unidademedida.enums.Situacao;
import lombok.Getter;
import lombok.Setter;

@Entity
@SequenceGenerator(name = "SEQ_UNIDADEMEDIDA", sequenceName = "SEQ_UNIDADEMEDIDA", allocationSize = 1)
@Table(name = "unidademedida")
@Getter @Setter

public class UnidadeMedida {

	@Id
	@Column(name = "unidademedidaid")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_UNIDADEMEDIDA")
	private Long id;
	
	@NotNull
	@Size(max = 300)
	private String nome;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private Situacao situacao;
}
