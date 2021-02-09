package br.inf.ids.treina1.api.localarmazenamento;

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

import br.inf.ids.treina1.api.localarmazenamento.enums.Situacao;
import lombok.Getter;
import lombok.Setter;

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
       
    public LocalArmazenamento(){    	
    }
    
    public LocalArmazenamento(Long id) {
    	this.id = id;
    }
}
