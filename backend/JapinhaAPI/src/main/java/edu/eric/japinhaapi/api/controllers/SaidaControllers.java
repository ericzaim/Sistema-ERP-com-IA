package edu.eric.japinhaapi.api.controllers;

import edu.eric.japinhaapi.api.dtos.saidas.SaidasDto;
import edu.eric.japinhaapi.api.models.SaidasModel;
import edu.eric.japinhaapi.api.services.product.SaidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080/")
@RequestMapping("/api/saidas")
public class SaidaControllers {

    @Autowired
    private SaidaService saidaService;

    @GetMapping
    public List<SaidasModel> getSaida(){
        return this.saidaService.findAll();
    };

    @GetMapping("/{id}")
    public SaidasDto getSaidaById(@PathVariable Long id){
        return this.saidaService.findEntityById(id);
    }

    @PostMapping
    public HttpStatusCode registrarSaida(@RequestBody SaidasDto dto){
        try{
            this.saidaService.save(dto);
            return HttpStatus.CREATED;
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

}
