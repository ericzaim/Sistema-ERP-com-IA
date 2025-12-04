package edu.eric.japinhaapi.api.dtos.products;

import edu.eric.japinhaapi.api.enums.Category;

public record ProductDtoCadastro(
        String name,
        String barcode,
        Category categoria,
        Double preco_custo,
        Double preco_venda,
        Integer estoqueAtual,
        Integer estoqueMinimo,
        String description
) {}
