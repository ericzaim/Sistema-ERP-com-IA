package edu.eric.japinhaapi.api.controllers;

import edu.eric.japinhaapi.api.dtos.users.UserDtoIn;
import edu.eric.japinhaapi.api.dtos.users.UserDtoLogin;
import edu.eric.japinhaapi.api.dtos.users.UserDtoOut;
import edu.eric.japinhaapi.api.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerErrorException;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/users")
public class UserControllers {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDtoOut>> getCostumers(){
        try{
            return ResponseEntity.ok(this.userService.getUsers());
        }catch (ServerErrorException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDtoOut> getUser(@PathVariable Long id) {
        try {
            Optional<UserDtoOut> customer = this.userService.getUserById(id);
            if (customer.isPresent()) {
                return ResponseEntity.ok(customer.get());
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found!");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error retrieving customer", e);
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<Optional<UserDtoOut>> AuthUser(@RequestBody UserDtoLogin login) {
        try{
            return ResponseEntity.ok(this.userService.AuthUser(login));
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"User ou Senha incorretos!");
        }
    }

    @PostMapping
    public HttpStatus saveUser(@RequestBody UserDtoIn user){
        try{
            this.userService.saveUsers(user);
            return HttpStatus.CREATED;
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    @PatchMapping("/{id}")
    public HttpStatus updateUser(@RequestBody UserDtoIn dto, @PathVariable Long id){
        try {
            this.userService.updateUser(id,dto);
            return HttpStatus.OK;
        }catch(Exception e){
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        this.userService.deleteById(id);
    }

}
