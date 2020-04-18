package br.inf.ids.treina1.api.categoria;

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

import br.inf.ids.treina1.api.categoria.enums.Situacao;
import lombok.Getter;
import lombok.Setter;

@Entity
@SequenceGenerator(name = "SEQ_CATEGORIA", sequenceName = "SEQ_CATEGORIA", allocationSize = 1)
@Table(name = "categoria")
@Getter @Setter

public class Categoria {

	@Id
	@Column(name = "categoriaid")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_CATEGORIA")
	private Long id;
	
	@NotNull
	@Size(max = 300)
	private String nome;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private Situacao situacao;
}
