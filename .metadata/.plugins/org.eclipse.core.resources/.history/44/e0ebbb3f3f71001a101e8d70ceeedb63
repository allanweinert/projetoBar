package br.inf.ids.treina1.api.pessoa;

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
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.br.CPF;

import br.inf.ids.treina1.api.municipio.Municipio;
import br.inf.ids.treina1.api.pessoa.enums.Sexo;
import br.inf.ids.treina1.api.pessoa.itens.telefone.Telefone;

@Entity
@SequenceGenerator(name = "SEQ_PESSOA", sequenceName = "SEQ_PESSOA", allocationSize = 1)
public class Pessoa {
	
	@Id
	@Column(name = "PESSOAID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_PESSOA")
	private Long id;
	
	@NotNull
	@Size(max = 300)
	private String nome;
	
	@CPF
	private String cpf;
	
	private LocalDate nascimento;
	
	@ManyToOne
	@JoinColumn(name = "MUNICIPIODENASCIMENTOID")
	private Municipio municipioDeNascimento;
	
	@Enumerated(EnumType.STRING)
	private Sexo sexo;
	
	@Valid
	@OneToMany(mappedBy = "pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Telefone> telefones;
	
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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public LocalDate getNascimento() {
		return nascimento;
	}

	public void setNascimento(LocalDate nascimento) {
		this.nascimento = nascimento;
	}

	public Sexo getSexo() {
		return sexo;
	}

	public void setSexo(Sexo sexo) {
		this.sexo = sexo;
	}

	public Municipio getMunicipioDeNascimento() {
		return municipioDeNascimento;
	}

	public void setMunicipioDeNascimento(Municipio municipioDeNascimento) {
		this.municipioDeNascimento = municipioDeNascimento;
	}

	public List<Telefone> getTelefones() {
		return telefones;
	}

	public void setTelefones(List<Telefone> telefones) {
		this.telefones = telefones;
	}
	
}
