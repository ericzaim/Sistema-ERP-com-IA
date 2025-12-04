package edu.eric.japinhaapi.api.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.time.LocalDateTime;

@Entity
@Table(name = "saida")
@Data
public class SaidasModel implements BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    LocalDateTime data_venda;

    double valor_total;

    @ManyToOne
    @JoinColumn(name = "id_vendedor", referencedColumnName = "id")
    private UserModel vendedor;

    @OneToMany(mappedBy = "saida", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ItensSaida> itens;
}
