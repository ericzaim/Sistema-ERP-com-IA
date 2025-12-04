package edu.eric.japinhaapi.api.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "item_compra")
@Data
public class ItensEntrada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantidade;

    @Column(name = "preco_unitario")
    private double precoUnitario;

    @ManyToOne
    @JoinColumn(name = "id_compra")
    private EntriesModel id_compra;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private ProductModel produto;
}
