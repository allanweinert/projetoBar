package br.inf.ids.treina1.api.pessoa.itens.telefone;

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

import br.inf.ids.treina1.api.pessoa.Pessoa;

@Entity
@Table(name = "PESSOATELEFONE")
@SequenceGenerator(name = "SEQ_PESSOATELEFONE", sequenceName = "SEQ_PESSOATELEFONE", allocationSize = 1)
public class Telefone {

	@Id
	@Column(name = "PESSOATELEFONEID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_PESSOATELEFONE")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "PESSOAID")
	@JsonIgnore
	private Pessoa pessoa;
	
	@NotNull
	@Size(max = 50)
	private String tipo;
	
	@NotNull
	@Size(min = 10, max = 11, message = "tamanho deve ser entre 10 e 11")
	@Pattern(regexp = ".*([0-9])", message = "permite apenas números")
	private String numero;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}
	
}
