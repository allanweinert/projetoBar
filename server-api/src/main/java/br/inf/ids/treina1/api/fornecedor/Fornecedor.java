package br.inf.ids.treina1.api.fornecedor;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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

import org.hibernate.validator.constraints.br.*;

import br.inf.ids.treina1.api.municipio.Municipio;
import lombok.Getter;
import lombok.Setter;
import br.inf.ids.treina1.api.fornecedor.itens.telefone.FornecedorTelefone;

@Entity
@SequenceGenerator(name = "SEQ_FORNECEDOR", sequenceName = "SEQ_FORNECEDOR", allocationSize = 1)
@Getter @Setter
public class Fornecedor {
	
	@Id
	@Column(name = "FORNECEDORID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FORNECEDOR")
	private Long id;
	
	@NotNull
	@Size(max = 300)
	private String razaoSocial;
	
	@NotNull
	@Size(max = 300)
	private String nomeFantasia;
	
	@CPF
	private String cpf;
	
	@CNPJ
	private String cnpj;
	
	@ManyToOne
	@JoinColumn(name = "MUNICIPIODOFORNECEDORID")
	private Municipio municipioDoFornecedor;
	
	@Valid
	@OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<FornecedorTelefone> telefones;

}
