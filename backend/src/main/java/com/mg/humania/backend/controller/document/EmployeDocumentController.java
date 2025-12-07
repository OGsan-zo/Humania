package com.mg.humania.backend.controller.document;

import com.mg.humania.backend.dto.document.EmployeDocumentDTO;
import com.mg.humania.backend.service.document.EmployeDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class EmployeDocumentController {

    private final EmployeDocumentService documentService;

    @GetMapping
    public ResponseEntity<List<EmployeDocumentDTO>> getAllDocuments() {
        return ResponseEntity.ok(documentService.getAllDocuments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeDocumentDTO> getDocumentById(@PathVariable Integer id) {
        return documentService.getDocumentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<List<EmployeDocumentDTO>> getDocumentsByEmployeId(@PathVariable Integer employeId) {
        return ResponseEntity.ok(documentService.getDocumentsByEmployeId(employeId));
    }

    @GetMapping("/expiring/{days}")
    public ResponseEntity<List<EmployeDocumentDTO>> getExpiringDocuments(@PathVariable Integer days) {
        return ResponseEntity.ok(documentService.getExpiringDocuments(days));
    }

    @GetMapping("/employe/{employeId}/expiring/{days}")
    public ResponseEntity<List<EmployeDocumentDTO>> getExpiringDocumentsByEmploye(
            @PathVariable Integer employeId,
            @PathVariable Integer days) {
        return ResponseEntity.ok(documentService.getExpiringDocumentsByEmploye(employeId, days));
    }

    @PostMapping
    public ResponseEntity<EmployeDocumentDTO> createDocument(@RequestBody EmployeDocumentDTO documentDTO) {
        EmployeDocumentDTO created = documentService.createDocument(documentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeDocumentDTO> updateDocument(@PathVariable Integer id, @RequestBody EmployeDocumentDTO documentDTO) {
        try {
            EmployeDocumentDTO updated = documentService.updateDocument(id, documentDTO);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Integer id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
}
