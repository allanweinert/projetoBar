package br.inf.ids.treina1.api.materia;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@SequenceGenerator(name = "SEQ_MATERIA", sequenceName = "SEQ_MATERIA", allocationSize = 1)
public class Materia {
	
	@Id
	@Column(name = "MATERIAID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_MATERIA")
	private Long id;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private Situacao situacao;
	
	@NotNull
	@Size(max = 300)
	@Pattern(regexp = ".*[A-Z]", message = "Só pode maiúsculas")
	private String nome;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Situacao getSituacao() {
		return situacao;
	}

	public void setSituacao(Situacao situacao) {
		this.situacao = situacao;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
}
