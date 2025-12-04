package edu.eric.japinhaapi.api.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "item_saida")
public class ItensSaida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_saida")
    @JsonBackReference
    private SaidasModel saida;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private ProductModel produto;

    private int quantidade;

    @Column(name = "preco_unitario")
    private double unit;
}
