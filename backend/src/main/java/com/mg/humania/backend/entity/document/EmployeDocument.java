package com.mg.humania.backend.entity.document;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "employes_documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "employe_id")
    private Integer employeId;

    @Column(name = "type_document_id")
    private Integer typeDocumentId;

    @Column(name = "numero_document", length = 100)
    private String numeroDocument;

    @Column(name = "date_emission")
    private LocalDate dateEmission;

    @Column(name = "date_expiration")
    private LocalDate dateExpiration;

    @Column(name = "fichier_path", length = 255)
    private String fichierPath;

    @Column(name = "statut_id")
    private Integer statutId;

    @Column(columnDefinition = "TEXT")
    private String remarques;
}
