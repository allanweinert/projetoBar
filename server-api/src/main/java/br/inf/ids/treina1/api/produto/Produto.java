package br.inf.ids.treina1.api.produto;

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

import br.inf.ids.treina1.api.produto.enums.Situacao;
import lombok.Getter;
import lombok.Setter;

@Entity
@SequenceGenerator(name = "SEQ_PRODUTO", sequenceName = "SEQ_PRODUTO", allocationSize = 1)
@Table(name = "produto")
@Getter @Setter
public class Produto {
	
	@Id
	@Column(name = "produtoid")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_PRODUTO")
	private Long id;
	
	@NotNull
	@Size(max = 300)
	private String nome;
	
	@NotNull
	private String marca;
	
	@NotNull
	private String unidade;
	
	private Integer estoque_minimo;
	
	@NotNull
	private Integer valor_venda;
	
	private Integer valor_custo;
	
	@Enumerated(EnumType.STRING)
	private Situacao situacao;
	
}