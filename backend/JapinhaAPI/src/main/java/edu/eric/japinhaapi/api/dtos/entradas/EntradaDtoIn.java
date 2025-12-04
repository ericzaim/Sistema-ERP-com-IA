package edu.eric.japinhaapi.api.dtos.entradas;

import java.time.LocalDateTime;
import java.util.List;

public record EntradaDtoIn(
        LocalDateTime dataCompra,
        Double valorTotal,
        List<ItemEntradaDtoIn> itens
) {}