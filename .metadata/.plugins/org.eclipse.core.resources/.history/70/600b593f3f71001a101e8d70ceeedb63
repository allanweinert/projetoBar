package br.inf.ids.treina1.api.municipio;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.inf.ids.treina1.api.municipio.uf.UF;

@Entity
@SequenceGenerator(name = "SEQ_MUNICIPIO", sequenceName = "SEQ_MUNICIPIO", allocationSize = 1)
public class Municipio {

	@Id
	@Column(name = "MUNICIPIOID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_MUNICIPIO")
	private Long id;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private UF uf;
	
	@Size(max = 300)
	private String nome;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UF getUf() {
		return uf;
	}

	public void setUf(UF uf) {
		this.uf = uf;
	}
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

}
