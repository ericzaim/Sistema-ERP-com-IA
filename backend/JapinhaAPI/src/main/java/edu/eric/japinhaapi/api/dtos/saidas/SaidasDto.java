package edu.eric.japinhaapi.api.dtos.saidas;

import edu.eric.japinhaapi.api.models.ItensSaida;
import edu.eric.japinhaapi.api.models.UserModel;

import java.util.List;

public record SaidasDto(
        double valor_total,
        UserModel vendedor,
        List<ItensSaida> itens
) {}
