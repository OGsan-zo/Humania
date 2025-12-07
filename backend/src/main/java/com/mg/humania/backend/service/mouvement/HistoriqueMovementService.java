package com.mg.humania.backend.service.mouvement;

import com.mg.humania.backend.dto.mouvement.HistoriqueMovementDTO;
import com.mg.humania.backend.mapper.mouvement.HistoriqueMovementMapper;
import com.mg.humania.backend.entity.mouvement.HistoriqueMovement;
import com.mg.humania.backend.repository.mouvement.HistoriqueMovementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistoriqueMovementService {

    private final HistoriqueMovementRepository movementRepository;
    private final HistoriqueMovementMapper movementMapper;

    public List<HistoriqueMovementDTO> getAllMovements() {
        return movementRepository.findAll()
                .stream()
                .map(movementMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<HistoriqueMovementDTO> getMovementById(Integer id) {
        return movementRepository.findById(id)
                .map(movementMapper::toDTO);
    }

    public List<HistoriqueMovementDTO> getMovementsByEmployeId(Integer employeId) {
        return movementRepository.findByEmployeId(employeId)
                .stream()
                .map(movementMapper::toDTO)
                .collect(Collectors.toList());
    }

    public HistoriqueMovementDTO createMovement(HistoriqueMovementDTO movementDTO) {
        HistoriqueMovement movement = movementMapper.toEntity(movementDTO);
        HistoriqueMovement saved = movementRepository.save(movement);
        return movementMapper.toDTO(saved);
    }

    public HistoriqueMovementDTO updateMovement(Integer id, HistoriqueMovementDTO movementDTO) {
        return movementRepository.findById(id)
                .map(movement -> {
                    movement.setMotif(movementDTO.getMotif());
                    HistoriqueMovement updated = movementRepository.save(movement);
                    return movementMapper.toDTO(updated);
                })
                .orElseThrow(() -> new RuntimeException("Mouvement non trouvé"));
    }

    public void deleteMovement(Integer id) {
        movementRepository.deleteById(id);
    }
}
