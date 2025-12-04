package edu.eric.japinhaapi.api.controllers;

import edu.eric.japinhaapi.api.dtos.entradas.EntradaDtoIn;
import edu.eric.japinhaapi.api.dtos.products.ProductDtoCadastro;
import edu.eric.japinhaapi.api.dtos.products.ProductsDtoListar;
import edu.eric.japinhaapi.api.services.product.EntradaService;
import edu.eric.japinhaapi.api.services.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080/")
@RequestMapping("/api/products")
public class ProductControllers {

    @Autowired
    private ProductService productService;

    @Autowired
    private EntradaService entradaService;

    @GetMapping
    public List<ProductsDtoListar> getAllProducts(){
        try {

            return this.productService.findAllProducts();

        }catch (ResponseStatusException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }catch (HttpServerErrorException.InternalServerError ise){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ise.getMessage());
        }
    }

    @PostMapping("/cadastro")
    public HttpStatusCode cadastro(@RequestBody ProductDtoCadastro req){
        try{
            this.productService.cadastrarProduto(req);
            return HttpStatus.CREATED;
        }catch (Exception e){
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    @PostMapping("/entrada")
    public HttpStatus registraEntrada(@RequestBody EntradaDtoIn entrada){
        try{
            this.entradaService.salvarEntrada(entrada);
            return  HttpStatus.CREATED;
        }catch (Exception e){
            throw new  ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }
}
