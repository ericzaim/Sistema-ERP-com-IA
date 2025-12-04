package edu.eric.japinhaapi.api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Category {
    Bermuda,
    Calça,
    Blusa,
    Regata,
    Intima,
    Camisa,
    Short;

    @JsonCreator
    public static Category fromString(String value) {
        for (Category c : Category.values()) {
            if (c.name().equalsIgnoreCase(value)
                    || c.name().replace("ç", "c").equalsIgnoreCase(value)) {
                return c;
            }
        }
        throw new IllegalArgumentException("Categoria inválida: " + value);
    }
}
