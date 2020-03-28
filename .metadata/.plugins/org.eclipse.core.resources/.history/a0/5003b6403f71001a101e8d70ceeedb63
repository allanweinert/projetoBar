package br.inf.ids.treina1.api.curso;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.inf.ids.treina1.api.curso.itens.conteudo.Conteudo;
import br.inf.ids.treina1.api.materia.Materia;
import br.inf.ids.treina1.api.materia.Situacao;

@Entity
@SequenceGenerator(name = "SEQ_CURSO", sequenceName = "SEQ_CURSO", allocationSize = 1)
public class Curso {
	
	@Id
	@Column(name = "cursoid")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_CURSO")
	private Long id;
	
	@NotNull
	@Size(max = 300)
	private String nome;
	
	@Enumerated(EnumType.STRING)
	private Situacao situacao;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "materiaid")
	private Materia materia;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "curso")
	private List<Conteudo> conteudos;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Situacao getSituacao() {
		return situacao;
	}

	public void setSituacao(Situacao situacao) {
		this.situacao = situacao;
	}

	public Materia getMateira() {
		return materia;
	}

	public void setMateira(Materia mateira) {
		this.materia = mateira;
	}

	public List<Conteudo> getConteudos() {
		return conteudos;
	}

	public void setConteudos(List<Conteudo> conteudos) {
		this.conteudos = conteudos;
	}
	
}
