package com.mg.humania.backend.entity.employe;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comptes_bancaires")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompteBancaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 50)
    private String numeroCompte;

    @Column(name = "banque_id")
    private Integer banqueId;

    @Column(length = 50)
    private String rib;

    @Column(length = 150)
    private String titulaire;

    @Column(name = "type_compte_id")
    private Integer typeCompteId;

    @Column(name = "statut_id")
    private Integer statutId;
}
