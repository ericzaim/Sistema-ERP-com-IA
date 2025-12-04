package edu.eric.japinhaapi.api.services.base_crud;

import edu.eric.japinhaapi.api.models.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

//Teste Herança
public abstract class CRUD<T extends BaseEntity, TDto, R extends JpaRepository<T, Long>> {

    protected final R repository;

    protected CRUD(R repository) {
        this.repository = repository;
    }

    protected abstract TDto toDto(T entity);
    protected abstract T toEntity(TDto dto);

    public void save(TDto dto) {
        repository.save(toEntity(dto));
    }

    public List<TDto> findAllDto() {
        return repository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    public List<T> findAll() {
        return repository.findAll();
    }

    public TDto findEntityById(Long id) {
        return toDto(repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro não encontrado")));
    }

    public T update(Long id, TDto Dto) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Registro não encontrado");
        }
        return repository.save(toEntity(Dto));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
