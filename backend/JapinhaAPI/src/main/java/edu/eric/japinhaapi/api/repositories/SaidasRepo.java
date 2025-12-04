package edu.eric.japinhaapi.api.repositories;


import edu.eric.japinhaapi.api.models.SaidasModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaidasRepo extends JpaRepository<SaidasModel, Long> {
}
