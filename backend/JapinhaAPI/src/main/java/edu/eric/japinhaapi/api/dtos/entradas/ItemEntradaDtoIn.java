package edu.eric.japinhaapi.api.dtos.entradas;

import edu.eric.japinhaapi.api.enums.Category;

public record ItemEntradaDtoIn(
        Long produtoId,
        String produtoNome,
        Integer quantidade,
        Double precoUnitario,
        Double precoCusto,
        Double precoVenda,
        String description,
        String barcode,
        Integer p,
        Integer m,
        Integer g,
        Category categoria
) {}