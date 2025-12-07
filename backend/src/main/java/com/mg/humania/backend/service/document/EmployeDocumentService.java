package com.mg.humania.backend.service.document;

import com.mg.humania.backend.dto.document.EmployeDocumentDTO;
import com.mg.humania.backend.mapper.document.EmployeDocumentMapper;
import com.mg.humania.backend.entity.document.EmployeDocument;
import com.mg.humania.backend.repository.document.EmployeDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeDocumentService {

    private final EmployeDocumentRepository documentRepository;
    private final EmployeDocumentMapper documentMapper;

    public List<EmployeDocumentDTO> getAllDocuments() {
        return documentRepository.findAll()
                .stream()
                .map(documentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<EmployeDocumentDTO> getDocumentById(Integer id) {
        return documentRepository.findById(id)
                .map(documentMapper::toDTO);
    }

    public List<EmployeDocumentDTO> getDocumentsByEmployeId(Integer employeId) {
        return documentRepository.findByEmployeId(employeId)
                .stream()
                .map(documentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<EmployeDocumentDTO> getExpiringDocuments(Integer daysBeforeExpiration) {
        LocalDate expirationDate = LocalDate.now().plusDays(daysBeforeExpiration);
        return documentRepository.findExpiringDocuments(expirationDate)
                .stream()
                .map(documentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<EmployeDocumentDTO> getExpiringDocumentsByEmploye(Integer employeId, Integer daysBeforeExpiration) {
        LocalDate expirationDate = LocalDate.now().plusDays(daysBeforeExpiration);
        return documentRepository.findExpiringDocumentsByEmploye(employeId, expirationDate)
                .stream()
                .map(documentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public EmployeDocumentDTO createDocument(EmployeDocumentDTO documentDTO) {
        EmployeDocument document = documentMapper.toEntity(documentDTO);
        EmployeDocument saved = documentRepository.save(document);
        return documentMapper.toDTO(saved);
    }

    public EmployeDocumentDTO updateDocument(Integer id, EmployeDocumentDTO documentDTO) {
        return documentRepository.findById(id)
                .map(document -> {
                    document.setTypeDocumentId(documentDTO.getTypeDocumentId());
                    document.setNumeroDocument(documentDTO.getNumeroDocument());
                    document.setDateEmission(documentDTO.getDateEmission());
                    document.setDateExpiration(documentDTO.getDateExpiration());
                    document.setFichierPath(documentDTO.getFichierPath());
                    document.setRemarques(documentDTO.getRemarques());
                    EmployeDocument updated = documentRepository.save(document);
                    return documentMapper.toDTO(updated);
                })
                .orElseThrow(() -> new RuntimeException("Document non trouvé"));
    }

    public void deleteDocument(Integer id) {
        documentRepository.deleteById(id);
    }
}
