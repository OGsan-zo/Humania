package com.mg.humania.backend.mapper.document;

import com.mg.humania.backend.dto.document.EmployeDocumentDTO;
import com.mg.humania.backend.entity.document.EmployeDocument;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class EmployeDocumentMapper {

    public EmployeDocumentDTO toDTO(EmployeDocument document) {
        if (document == null) {
            return null;
        }

        Long joursAvantExpiration = null;
        String alerteStatut = null;

        if (document.getDateExpiration() != null) {
            joursAvantExpiration = java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), document.getDateExpiration());
            
            if (joursAvantExpiration < 0) {
                alerteStatut = "EXPIRE";
            } else if (joursAvantExpiration <= 7) {
                alerteStatut = "CRITIQUE";
            } else if (joursAvantExpiration <= 30) {
                alerteStatut = "ALERTE";
            } else {
                alerteStatut = "VALIDE";
            }
        }

        return EmployeDocumentDTO.builder()
                .id(document.getId())
                .employeId(document.getEmployeId())
                .typeDocumentId(document.getTypeDocumentId())
                .numeroDocument(document.getNumeroDocument())
                .dateEmission(document.getDateEmission())
                .dateExpiration(document.getDateExpiration())
                .fichierPath(document.getFichierPath())
                .remarques(document.getRemarques())
                .joursAvantExpiration(joursAvantExpiration)
                .alerteStatut(alerteStatut)
                .build();
    }

    public EmployeDocument toEntity(EmployeDocumentDTO dto) {
        if (dto == null) {
            return null;
        }

        return EmployeDocument.builder()
                .id(dto.getId())
                .employeId(dto.getEmployeId())
                .typeDocumentId(dto.getTypeDocumentId())
                .numeroDocument(dto.getNumeroDocument())
                .dateEmission(dto.getDateEmission())
                .dateExpiration(dto.getDateExpiration())
                .fichierPath(dto.getFichierPath())
                .remarques(dto.getRemarques())
                .build();
    }
}
