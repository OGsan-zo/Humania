package com.mg.humania.backend.service.contrat;

import com.mg.humania.backend.dto.contrat.ContratDTO;
import com.mg.humania.backend.mapper.contrat.ContratMapper;
import com.mg.humania.backend.entity.contrat.Contrat;
import com.mg.humania.backend.repository.contrat.ContratRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContratService {

    private final ContratRepository contratRepository;
    private final ContratMapper contratMapper;

    public List<ContratDTO> getAllContrats() {
        return contratRepository.findAll()
                .stream()
                .map(contratMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<ContratDTO> getContratById(Integer id) {
        return contratRepository.findById(id)
                .map(contratMapper::toDTO);
    }

    public Optional<ContratDTO> getContratByEmployeId(Integer employeId) {
        return contratRepository.findByEmployeId(employeId)
                .map(contratMapper::toDTO);
    }

    public List<ContratDTO> getContratsByType(String typeContrat) {
        return contratRepository.findByTypeContrat(typeContrat)
                .stream()
                .map(contratMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ContratDTO> getExpiringContracts(Integer daysBeforeExpiration) {
        LocalDate expirationDate = LocalDate.now().plusDays(daysBeforeExpiration);
        return contratRepository.findExpiringContracts(expirationDate)
                .stream()
                .map(contratMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ContratDTO createContrat(ContratDTO contratDTO) {
        Contrat contrat = contratMapper.toEntity(contratDTO);
        Contrat saved = contratRepository.save(contrat);
        return contratMapper.toDTO(saved);
    }

    public ContratDTO updateContrat(Integer id, ContratDTO contratDTO) {
        return contratRepository.findById(id)
                .map(contrat -> {
                    contrat.setTypeContrat(contratDTO.getTypeContrat());
                    contrat.setDateDebut(contratDTO.getDateDebut());
                    contrat.setDateFin(contratDTO.getDateFin());
                    Contrat updated = contratRepository.save(contrat);
                    return contratMapper.toDTO(updated);
                })
                .orElseThrow(() -> new RuntimeException("Contrat non trouvé"));
    }

    public void deleteContrat(Integer id) {
        contratRepository.deleteById(id);
    }
}
