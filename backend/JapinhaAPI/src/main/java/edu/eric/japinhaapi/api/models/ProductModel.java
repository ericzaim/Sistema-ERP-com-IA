package edu.eric.japinhaapi.api.models;

import edu.eric.japinhaapi.api.enums.Category;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "preco_custo")
    private Double preco_custo;

    @Column(name = "preco_venda")
    private Double preco_venda;

    @Column(name = "estoque_atual")
    private Integer estoqueAtual;

    @Column(name = "estoque_minimo")
    private Integer estoqueMinimo;

    // Quantidades por tamanho
    @Column(name = "p")
    private Integer p;

    @Column(name = "m")
    private Integer m;

    @Column(name = "g")
    private Integer g;

    private String description;
    private String barcode;

    @Column(name = "categoria")
    private Category categoria;  // Camisa, Blusa, Short, Calça, etc.
}