package com.mg.humania.backend.entity.employe;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employes_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "employe_id", unique = true, nullable = false)
    private Integer employeId;

    @Column(name = "photo_path")
    private String photoPath;

    @Column(length = 20)
    private String telephone;

    @Column(name = "telephone_mobile", length = 20)
    private String telephoneMobile;

    @Column(columnDefinition = "TEXT")
    private String adresse;

    @Column(length = 100)
    private String ville;

    @Column(name = "code_postal", length = 10)
    private String codePostal;

    @Column(length = 100)
    private String pays;

    @Column(name = "situation_familiale_id")
    private Integer situationFamilialId;

    @Column(name = "nombre_enfants")
    private Integer nombreEnfants;

    @Column(name = "cin_id")
    private Integer cinId;

    @Column(name = "compte_bancaire_id")
    private Integer compteBancaireId;

    @Column(name = "numero_cnaps", length = 50)
    private String numeroCnaps;

    @Column(name = "numero_ostie", length = 50)
    private String numeroOstie;
}
