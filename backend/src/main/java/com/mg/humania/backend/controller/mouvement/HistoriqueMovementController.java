package com.mg.humania.backend.controller.mouvement;

import com.mg.humania.backend.dto.mouvement.HistoriqueMovementDTO;
import com.mg.humania.backend.service.mouvement.HistoriqueMovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mouvements")
@RequiredArgsConstructor
public class HistoriqueMovementController {

    private final HistoriqueMovementService movementService;

    @GetMapping
    public ResponseEntity<List<HistoriqueMovementDTO>> getAllMovements() {
        return ResponseEntity.ok(movementService.getAllMovements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoriqueMovementDTO> getMovementById(@PathVariable Integer id) {
        return movementService.getMovementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<List<HistoriqueMovementDTO>> getMovementsByEmployeId(@PathVariable Integer employeId) {
        return ResponseEntity.ok(movementService.getMovementsByEmployeId(employeId));
    }

    @PostMapping
    public ResponseEntity<HistoriqueMovementDTO> createMovement(@RequestBody HistoriqueMovementDTO movementDTO) {
        HistoriqueMovementDTO created = movementService.createMovement(movementDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HistoriqueMovementDTO> updateMovement(@PathVariable Integer id, @RequestBody HistoriqueMovementDTO movementDTO) {
        try {
            HistoriqueMovementDTO updated = movementService.updateMovement(id, movementDTO);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovement(@PathVariable Integer id) {
        movementService.deleteMovement(id);
        return ResponseEntity.noContent().build();
    }
}
