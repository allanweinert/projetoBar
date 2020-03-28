package br.inf.ids.treina1.api.curso.itens.conteudo;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.inf.ids.treina1.api.curso.Curso;

@Entity
@SequenceGenerator(name = "seq_cursoconteudo", sequenceName = "seq_cursoconteudo", allocationSize = 1)
@Table(name = "cursoconteudo")
public class Conteudo {

	@Id
	@Column(name = "cursoconteudoid")
	@GeneratedValue(generator = "seq_cursoconteudo", strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "cursoid")
	private Curso curso;
	
	@Size(max = 50)
	private String nome;
	
	@Size(max = 1000)
	private String descricao;
	
	private LocalDate dia;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Curso getCurso() {
		return curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDate getDia() {
		return dia;
	}

	public void setDia(LocalDate dia) {
		this.dia = dia;
	}
	
}
