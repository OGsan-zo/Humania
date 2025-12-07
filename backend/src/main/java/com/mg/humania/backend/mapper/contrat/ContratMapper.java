package com.mg.humania.backend.mapper.contrat;

import com.mg.humania.backend.dto.contrat.ContratDTO;
import com.mg.humania.backend.entity.contrat.Contrat;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class ContratMapper {

    public ContratDTO toDTO(Contrat contrat) {
        if (contrat == null) {
            return null;
        }

        Long joursAvantExpiration = null;
        if (contrat.getDateFin() != null) {
            joursAvantExpiration = java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), contrat.getDateFin());
        }

        return ContratDTO.builder()
                .id(contrat.getId())
                .typeContrat(contrat.getTypeContrat())
                .dateDebut(contrat.getDateDebut())
                .dateFin(contrat.getDateFin())
                .employeId(contrat.getEmployeId())
                .joursAvantExpiration(joursAvantExpiration)
                .build();
    }

    public Contrat toEntity(ContratDTO dto) {
        if (dto == null) {
            return null;
        }

        return Contrat.builder()
                .id(dto.getId())
                .typeContrat(dto.getTypeContrat())
                .dateDebut(dto.getDateDebut())
                .dateFin(dto.getDateFin())
                .employeId(dto.getEmployeId())
                .build();
    }
}
