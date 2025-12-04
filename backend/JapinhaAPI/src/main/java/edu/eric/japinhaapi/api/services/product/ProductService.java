package edu.eric.japinhaapi.api.services.product;

import edu.eric.japinhaapi.api.dtos.products.ProductDtoCadastro;
import edu.eric.japinhaapi.api.dtos.products.ProductsDtoListar;
import edu.eric.japinhaapi.api.models.ProductModel;
import edu.eric.japinhaapi.api.repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<ProductsDtoListar> findAllProducts(){
        return this.productRepo.findAll(PageRequest.of(0,5))
                .stream()
                .map(this::toDtoListar)
                .toList();
    }

    public String cadastrarProduto(ProductDtoCadastro dto){
        try{
            Optional<ProductModel> product = this.productRepo.findByName(dto.name());
            if (product.isEmpty()){
                this.productRepo.save(toEntity(dto));
            }else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"product already exists "+dto.name());
            }
        }catch(Exception e){
            throw new RuntimeException("Erro ao criar produto",e);
        }
        return null;
    }

    public static ProductModel toEntity(ProductDtoCadastro dto) {
        ProductModel product = new ProductModel();
        product.setName(dto.name());
        product.setBarcode(dto.barcode());
        product.setDescription(dto.description());
        product.setCategoria(dto.categoria());
        product.setPreco_custo(dto.preco_custo());
        product.setPreco_venda(dto.preco_venda());
        product.setEstoqueAtual(dto.estoqueAtual());
        product.setEstoqueMinimo(dto.estoqueMinimo());
        return product;
    }

    public ProductsDtoListar toDtoListar(ProductModel product) {
        return new ProductsDtoListar(
                product.getId(),
                product.getName(),
                product.getPreco_venda(),
                product.getBarcode()
                );
    }

}
