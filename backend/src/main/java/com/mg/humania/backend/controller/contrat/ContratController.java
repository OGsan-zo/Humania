package com.mg.humania.backend.controller.contrat;

import com.mg.humania.backend.dto.contrat.ContratDTO;
import com.mg.humania.backend.service.contrat.ContratService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contrats")
@RequiredArgsConstructor
public class ContratController {

    private final ContratService contratService;

    @GetMapping
    public ResponseEntity<List<ContratDTO>> getAllContrats() {
        return ResponseEntity.ok(contratService.getAllContrats());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContratDTO> getContratById(@PathVariable Integer id) {
        return contratService.getContratById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<ContratDTO> getContratByEmployeId(@PathVariable Integer employeId) {
        return contratService.getContratByEmployeId(employeId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{typeContrat}")
    public ResponseEntity<List<ContratDTO>> getContratsByType(@PathVariable String typeContrat) {
        return ResponseEntity.ok(contratService.getContratsByType(typeContrat));
    }

    @GetMapping("/expiring/{days}")
    public ResponseEntity<List<ContratDTO>> getExpiringContracts(@PathVariable Integer days) {
        return ResponseEntity.ok(contratService.getExpiringContracts(days));
    }

    @PostMapping
    public ResponseEntity<ContratDTO> createContrat(@RequestBody ContratDTO contratDTO) {
        ContratDTO created = contratService.createContrat(contratDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContratDTO> updateContrat(@PathVariable Integer id, @RequestBody ContratDTO contratDTO) {
        try {
            ContratDTO updated = contratService.updateContrat(id, contratDTO);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContrat(@PathVariable Integer id) {
        contratService.deleteContrat(id);
        return ResponseEntity.noContent().build();
    }
}
