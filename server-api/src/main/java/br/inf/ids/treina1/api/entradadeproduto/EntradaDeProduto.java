package br.inf.ids.treina1.api.entradadeproduto;

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
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.inf.ids.treina1.api.entradadeproduto.enums.TipoDeEntrada;
import br.inf.ids.treina1.api.entradadeproduto.itens.ItensDaEntrada;
import br.inf.ids.treina1.api.fornecedor.Fornecedor;

@Entity
@SequenceGenerator(name = "SEQ_ENTRADAPRODUTO", sequenceName = "SEQ_ENTRADAPRODUTO", allocationSize = 1)
@Table(name = "entradaproduto")
public class EntradaDeProduto {
	
	@Id
	@Column(name = "ENTRADAPRODUTOID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ENTRADAPRODUTO")
	private Long id;
	
	@Enumerated(EnumType.STRING)
	private TipoDeEntrada tipoentrada;
	
	@JsonIgnoreProperties({"telefones"})
	@ManyToOne
	@JoinColumn(name = "FORNECEDORID")
	private Fornecedor fornecedor;
	
	@NotNull
	private LocalDate dataentrada;

	@Valid
	@OneToMany(mappedBy = "entrada", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ItensDaEntrada> itensdaentrada;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Fornecedor getFornecedor() {
		return fornecedor;
	}


	public void setFornecedor(Fornecedor fornecedor) {
		this.fornecedor = fornecedor;
	}


	public LocalDate getDataentrada() {
		return dataentrada;
	}


	public void setDataentrada(LocalDate dataentrada) {
		this.dataentrada = dataentrada;
	}


	public List<ItensDaEntrada> getItensdaentrada() {
		return itensdaentrada;
	}


	public void setItensdaentrada(List<ItensDaEntrada> itensdaentrada) {
		this.itensdaentrada = itensdaentrada;
	}

	

}
