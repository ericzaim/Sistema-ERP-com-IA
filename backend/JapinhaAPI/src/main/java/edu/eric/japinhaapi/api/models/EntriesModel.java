package edu.eric.japinhaapi.api.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "compra")
@Data
public class EntriesModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataCompra;
    private Double valorTotal;

    @OneToMany(mappedBy = "id_compra", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItensEntrada> itens;

}
