package com.mg.humania.backend.dto.mouvement;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoriqueMovementDTO {

    private Integer id;
    private Integer employeId;
    private String typeMovement;
    private String ancienPoste;
    private String ancienDepartement;
    private BigDecimal ancienSalaire;
    private String nouveauPoste;
    private String nouveauDepartement;
    private BigDecimal nouveauSalaire;
    private LocalDate dateMovement;
    private String motif;
}
