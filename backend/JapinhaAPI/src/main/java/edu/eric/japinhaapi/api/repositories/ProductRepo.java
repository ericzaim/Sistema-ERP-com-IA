package edu.eric.japinhaapi.api.repositories;

import edu.eric.japinhaapi.api.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<ProductModel,Long> {
    Optional<ProductModel> findByName(String name);
}
