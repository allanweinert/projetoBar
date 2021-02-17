package br.inf.ids.treina1.api.produto;

import br.inf.ids.treina1.api.categoria.Categoria;
import br.inf.ids.treina1.api.movimentacao.itens.ItemEntrada;
import br.inf.ids.treina1.api.produto.enums.Situacao;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@SequenceGenerator(name = "SEQ_PRODUTO", sequenceName = "SEQ_PRODUTO", allocationSize = 1)
@Table(name = "produto")
@Getter
@Setter
public class Produto {

    @Id
    @Column(name = "produtoid")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_PRODUTO")
    private Long id;

    @NotNull
    @Size(max = 300)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "categoriaid")
    private Categoria categoria;

    @NotNull
    private Integer estoque_minimo;

    @Enumerated(EnumType.STRING)
    private Situacao situacao;
    
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "itementradaid")
    @JsonIgnore
    private List<ItemEntrada> entradas;
    
}
