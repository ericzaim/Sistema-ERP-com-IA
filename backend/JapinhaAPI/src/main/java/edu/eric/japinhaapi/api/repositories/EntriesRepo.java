package edu.eric.japinhaapi.api.repositories;

import edu.eric.japinhaapi.api.models.EntriesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntriesRepo extends JpaRepository<EntriesModel,Long> {

}
