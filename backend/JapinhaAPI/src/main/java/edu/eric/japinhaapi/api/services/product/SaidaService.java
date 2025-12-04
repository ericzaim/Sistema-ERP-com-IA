package edu.eric.japinhaapi.api.services.product;

import edu.eric.japinhaapi.api.dtos.saidas.SaidasDto;
import edu.eric.japinhaapi.api.models.ItensSaida;
import edu.eric.japinhaapi.api.models.ProductModel;
import edu.eric.japinhaapi.api.models.SaidasModel;
import edu.eric.japinhaapi.api.repositories.ProductRepo;
import edu.eric.japinhaapi.api.repositories.SaidasRepo;
import edu.eric.japinhaapi.api.services.base_crud.CRUD;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SaidaService extends CRUD<SaidasModel, SaidasDto, SaidasRepo> {

    private final ProductRepo productRepo;

    protected SaidaService(SaidasRepo repository,ProductRepo productRepo) {
        super(repository);
        this.productRepo = productRepo;
    }

    @Override
    @Transactional
    public void save(SaidasDto dto){
        this.repository.save(toEntity(dto));
    }

    @Override
    protected SaidasDto toDto(SaidasModel saida) {
        // Implementar conversão inversa se necessário
        return null;
    }

    @Override
    protected SaidasModel toEntity(SaidasDto dto) {
        return new SaidasModel();
    }
}