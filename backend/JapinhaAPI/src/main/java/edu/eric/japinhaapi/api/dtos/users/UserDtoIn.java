package edu.eric.japinhaapi.api.dtos.users;

import edu.eric.japinhaapi.api.enums.Roles;

public record UserDtoIn(String name, Roles role, String password) {
}
