package com.mg.humania.backend.mapper.mouvement;

import com.mg.humania.backend.dto.mouvement.HistoriqueMovementDTO;
import com.mg.humania.backend.entity.mouvement.HistoriqueMovement;
import org.springframework.stereotype.Component;

@Component
public class HistoriqueMovementMapper {

    public HistoriqueMovementDTO toDTO(HistoriqueMovement movement) {
        if (movement == null) {
            return null;
        }

        return HistoriqueMovementDTO.builder()
                .id(movement.getId())
                .employeId(movement.getEmployeId())
                .ancienSalaire(movement.getAncienSalaire())
                .nouveauSalaire(movement.getNouveauSalaire())
                .dateMovement(movement.getDateMovement())
                .motif(movement.getMotif())
                .build();
    }

    public HistoriqueMovement toEntity(HistoriqueMovementDTO dto) {
        if (dto == null) {
            return null;
        }

        return HistoriqueMovement.builder()
                .id(dto.getId())
                .employeId(dto.getEmployeId())
                .ancienSalaire(dto.getAncienSalaire())
                .nouveauSalaire(dto.getNouveauSalaire())
                .dateMovement(dto.getDateMovement())
                .motif(dto.getMotif())
                .build();
    }
}
