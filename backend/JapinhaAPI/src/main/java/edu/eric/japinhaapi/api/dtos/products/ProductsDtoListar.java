package edu.eric.japinhaapi.api.dtos.products;

public record ProductsDtoListar(
        Long id,
        String name,
        Double preco_venda,
        String barcode
){}
