package com.mg.humania.backend.dto.contrat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContratDTO {

    private Integer id;
    private String typeContrat;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Integer employeId;
    private String employeNom;
    private String employePrenom;
    private String employeMatricule;
    private String statut;
    private Long joursAvantExpiration;
}
