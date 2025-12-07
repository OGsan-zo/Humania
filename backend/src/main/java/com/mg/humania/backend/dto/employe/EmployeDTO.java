package com.mg.humania.backend.dto.employe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeDTO {

    private Integer id;
    private String matricule;
    private String nom;
    private String prenom;
    private String email;
    private LocalDate dateNaissance;
    private LocalDate dateEmbauche;
    private String statut;

    // Détails
    private String telephone;
    private String telephoneMobile;
    private String adresse;
    private String ville;
    private String photoPath;

    // Poste actuel
    private String posteActuel;
    private String codePoste;
    private String departement;
    private String salaire;

    // Contrat
    private String typeContrat;
    private LocalDate dateDebutContrat;
    private LocalDate dateFinContrat;

    // CIN
    private String numeroCin;
    private String lieuNaissance;
    private String nationalite;

    // Compte bancaire
    private String numeroCompte;
    private String banque;
    private String rib;
    private String typeCompte;

    // Sécurité sociale
    private String numeroCnaps;
    private String numeroOstie;
}
