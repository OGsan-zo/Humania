package com.mg.humania.backend.entity.employe;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "employes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String matricule;

    @Column(name = "candidat_id")
    private Integer candidatId;

    @Column(name = "contrat_id")
    private Integer contratId;

    @Column(name = "date_embauche")
    private LocalDate dateEmbauche;

    @Column(nullable = false)
    private String statut;
}
