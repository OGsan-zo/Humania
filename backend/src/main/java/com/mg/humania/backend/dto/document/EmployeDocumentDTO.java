package com.mg.humania.backend.dto.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeDocumentDTO {

    private Integer id;
    private Integer employeId;
    private Integer typeDocumentId;
    private String typeDocumentLibelle;
    private String numeroDocument;
    private LocalDate dateEmission;
    private LocalDate dateExpiration;
    private String fichierPath;
    private String statut;
    private String remarques;
    private Long joursAvantExpiration;
    private String alerteStatut;
}
