package edu.eric.japinhaapi.api.services.user;

import edu.eric.japinhaapi.api.dtos.users.UserDtoIn;
import edu.eric.japinhaapi.api.dtos.users.UserDtoLogin;
import edu.eric.japinhaapi.api.dtos.users.UserDtoOut;
import edu.eric.japinhaapi.api.models.UserModel;
import edu.eric.japinhaapi.api.repositories.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo usersRepo;

    public void saveUsers(UserDtoIn dtoIn){
        UserModel user = new UserModel(dtoIn.name(),dtoIn.password());
        this.usersRepo.save(user);
    }

    public List<UserDtoOut> getUsers(){
        try {
            return this.usersRepo.findAll()
                    .stream()
                    .map(this::toDtoOut)
                    .toList();
        }catch (EntityNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    public Optional<UserDtoOut> getUserById(Long id){
        return this.usersRepo.findById(id).map(this::toDtoOut);
    }

    public Optional<UserDtoOut> AuthUser(UserDtoLogin login) throws Exception{
        try {
            Optional<UserModel> user = this.usersRepo.findByName(login.name());
            if(user.isEmpty()){
                throw  new ResponseStatusException(HttpStatus.NOT_FOUND, login.name());
            }
            if(user.get().getPassword().equals(login.password())){
                return user.map(this::toDtoOut);
            }else {
                return Optional.empty();
            }
        }catch (Exception e){
            throw new Exception();
        }
    }

    public void updateUser(Long id, UserDtoIn dto) {
        UserModel user = this.usersRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));

        user.setName(dto.name());
        user.setRole(dto.role());
        user.setPassword(dto.password());
        usersRepo.save(user);
    }


    public void deleteById(Long id){
        this.usersRepo.deleteById(id);
    }


    public UserDtoOut toDtoOut(UserModel model){
        return new UserDtoOut(model.getId(),model.getName(),model.getRole());
    }
    public UserDtoIn toDtoIn(UserModel model){
        return new UserDtoIn(model.getName(),model.getRole(),model.getPassword());
    }

    public UserModel toEntity(UserDtoIn dto) {
        return new UserModel(dto.name(), dto.password());
    }

}
