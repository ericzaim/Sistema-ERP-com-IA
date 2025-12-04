package edu.eric.japinhaapi.api.services.product;

import edu.eric.japinhaapi.api.dtos.entradas.EntradaDtoIn;
import edu.eric.japinhaapi.api.dtos.entradas.ItemEntradaDtoIn;
import edu.eric.japinhaapi.api.models.EntriesModel;
import edu.eric.japinhaapi.api.models.ItensEntrada;
import edu.eric.japinhaapi.api.models.ProductModel;
import edu.eric.japinhaapi.api.repositories.EntriesRepo;
import edu.eric.japinhaapi.api.repositories.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EntradaService {

    @Autowired
    EntriesRepo entriesRepo;
    @Autowired
    ProductRepo productRepo;

    @Transactional
    public void salvarEntrada(EntradaDtoIn entradaDto) {

        // Create and populate the entry
        EntriesModel entrada = new EntriesModel();
        entrada.setValorTotal(entradaDto.valorTotal());
        entrada.setDataCompra(entradaDto.dataCompra());

        List<ItensEntrada> itens = new ArrayList<>();

        // Iterate over the items in the entry
        for (ItemEntradaDtoIn itemDto : entradaDto.itens()) {
            ItensEntrada item = new ItensEntrada();
            item.setId_compra(entrada);
            item.setQuantidade(itemDto.quantidade());
            item.setPrecoUnitario(itemDto.precoUnitario());

            // Find the product or create if it doesn't exist
            ProductModel produto = buscarOuCriarProduto(itemDto);

            // Update the stock (total e por tamanho)
            atualizarEstoque(produto, itemDto);
            productRepo.save(produto);

            // Associate the product with the item
            item.setProduto(produto);
            itens.add(item);
        }

        // 6️⃣ Associate the items with the entry
        entrada.setItens(itens);

        // 7️⃣ Save the entry (cascade saves the items)
        entriesRepo.save(entrada);
    }

    private ProductModel buscarOuCriarProduto(ItemEntradaDtoIn itemDto) {
        Optional<ProductModel> produtoExistente = Optional.empty();

        // Tenta buscar por ID se foi fornecido
        if (itemDto.produtoId() != null) {
            produtoExistente = productRepo.findById(itemDto.produtoId());
        }

        // Se não encontrou por ID, tenta buscar por nome
        if (produtoExistente.isEmpty() && itemDto.produtoNome() != null && !itemDto.produtoNome().isBlank()) {
            produtoExistente = productRepo.findByName(itemDto.produtoNome());
        }

        // Se encontrou, retorna o produto existente
        if (produtoExistente.isPresent()) {
            return produtoExistente.get();
        }

        // Se não encontrou, cria um novo produto
        return criarNovoProduto(itemDto);
    }

    private ProductModel criarNovoProduto(ItemEntradaDtoIn itemDto) {
        // Valida se tem as informações mínimas para criar um produto
        if (itemDto.produtoNome() == null || itemDto.produtoNome().isBlank()) {
            throw new IllegalArgumentException("Nome do produto é obrigatório para criar um novo produto");
        }

        ProductModel novo = new ProductModel();
        novo.setName(itemDto.produtoNome());
        novo.setPreco_custo(itemDto.precoCusto() != null ? itemDto.precoCusto() : 0.0);
        novo.setPreco_venda(itemDto.precoVenda() != null ? itemDto.precoVenda() : 0.0);
        novo.setEstoqueAtual(0);
        novo.setEstoqueMinimo(0);
        novo.setP(0);
        novo.setM(0);
        novo.setG(0);
        novo.setDescription(itemDto.description() != null ? itemDto.description() : "");
        novo.setBarcode(itemDto.barcode() != null ? itemDto.barcode() : "");
        novo.setCategoria(itemDto.categoria() != null ? itemDto.categoria() : null);

        return productRepo.save(novo);
    }

    private void atualizarEstoque(ProductModel produto, ItemEntradaDtoIn itemDto) {
        // Atualiza estoque total
        int quantidadeTotal = itemDto.quantidade() != null ? itemDto.quantidade() : 0;
        produto.setEstoqueAtual(produto.getEstoqueAtual() + quantidadeTotal);

        // Atualiza estoque por tamanho
        if (itemDto.p() != null) {
            produto.setP(produto.getP() + itemDto.p());
        }
        if (itemDto.m() != null) {
            produto.setM(produto.getM() + itemDto.m());
        }
        if (itemDto.g() != null) {
            produto.setG(produto.getG() + itemDto.g());
        }

        // Atualiza a categoria se foi fornecida
        if (itemDto.categoria() != null) {
            produto.setCategoria(itemDto.categoria());
        }
    }
}