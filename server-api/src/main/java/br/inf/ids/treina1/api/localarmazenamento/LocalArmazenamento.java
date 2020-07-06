package br.inf.ids.treina1.api.localarmazenamento;

import br.inf.ids.treina1.api.localarmazenamento.enums.Situacao;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@SequenceGenerator(name = "SEQ_LOCALARMAZENAMENTO", sequenceName = "SEQ_LOCALARMAZENAMENTO", allocationSize = 1)
@Table(name = "localarmazenamento")
@Getter
@Setter

public class LocalArmazenamento {

    @Id
    @Column(name = "localarmazenamentoid")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_LOCALARMAZENAMENTO")
    private Long id;

    @NotNull
    @Size(max = 300)
    private String nome;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Situacao situacao;
       
}
