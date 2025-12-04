package edu.eric.japinhaapi.api.models;

import edu.eric.japinhaapi.api.dtos.users.UserDtoIn;
import edu.eric.japinhaapi.api.dtos.users.UserDtoOut;
import edu.eric.japinhaapi.api.enums.Roles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "roles")
    private Roles role;

    @Column(nullable = false)
    private String password;


    public UserModel(String name, Roles roles,String password) {
        this.name = name;
        this.role = roles;
        this.password = password;

    }

    public UserModel(String name, String password) {
        this.name = name;
        this.password = password;
    }
}
