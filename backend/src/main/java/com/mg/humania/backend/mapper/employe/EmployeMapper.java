package com.mg.humania.backend.mapper.employe;

import com.mg.humania.backend.dto.employe.EmployeDTO;
import com.mg.humania.backend.entity.employe.Employe;
import org.springframework.stereotype.Component;

@Component
public class EmployeMapper {

    public EmployeDTO toDTO(Employe employe) {
        if (employe == null) {
            return null;
        }

        return EmployeDTO.builder()
                .id(employe.getId())
                .matricule(employe.getMatricule())
                .dateEmbauche(employe.getDateEmbauche())
                .statut(employe.getStatut())
                .build();
    }

    public Employe toEntity(EmployeDTO dto) {
        if (dto == null) {
            return null;
        }

        return Employe.builder()
                .id(dto.getId())
                .matricule(dto.getMatricule())
                .dateEmbauche(dto.getDateEmbauche())
                .statut(dto.getStatut())
                .build();
    }
}
