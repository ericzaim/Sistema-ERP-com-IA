package edu.eric.japinhaapi.api.dtos.users;

import edu.eric.japinhaapi.api.enums.Roles;

public record UserDtoOut(Long id,String name, Roles role) {
}
