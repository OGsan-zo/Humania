package com.mg.humania.backend.controller.employe;

import com.mg.humania.backend.dto.employe.EmployeDTO;
import com.mg.humania.backend.service.employe.EmployeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employes")
@RequiredArgsConstructor
public class EmployeController {

    private final EmployeService employeService;

    @GetMapping
    public ResponseEntity<List<EmployeDTO>> getAllEmployes() {
        return ResponseEntity.ok(employeService.getAllEmployes());
    }

    @GetMapping("/actifs")
    public ResponseEntity<List<EmployeDTO>> getEmployesActifs() {
        return ResponseEntity.ok(employeService.getEmployesActifs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeDTO> getEmployeById(@PathVariable Integer id) {
        return employeService.getEmployeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/matricule/{matricule}")
    public ResponseEntity<EmployeDTO> getEmployeByMatricule(@PathVariable String matricule) {
        return employeService.getEmployeByMatricule(matricule)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EmployeDTO> createEmploye(@RequestBody EmployeDTO employeDTO) {
        EmployeDTO created = employeService.createEmploye(employeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeDTO> updateEmploye(@PathVariable Integer id, @RequestBody EmployeDTO employeDTO) {
        try {
            EmployeDTO updated = employeService.updateEmploye(id, employeDTO);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmploye(@PathVariable Integer id) {
        employeService.deleteEmploye(id);
        return ResponseEntity.noContent().build();
    }
}
