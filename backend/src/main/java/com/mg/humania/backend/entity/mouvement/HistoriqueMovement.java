package com.mg.humania.backend.entity.mouvement;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "historique_mouvements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoriqueMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "employe_id")
    private Integer employeId;

    @Column(name = "type_mouvement_id")
    private Integer typeMovementId;

    @Column(name = "ancien_poste_id")
    private Integer ancienPosteId;

    @Column(name = "ancien_departement_id")
    private Integer ancienDepartementId;

    @Column(name = "ancien_salaire", precision = 10, scale = 2)
    private BigDecimal ancienSalaire;

    @Column(name = "nouveau_poste_id")
    private Integer nouveauPosteId;

    @Column(name = "nouveau_departement_id")
    private Integer nouveauDepartementId;

    @Column(name = "nouveau_salaire", precision = 10, scale = 2)
    private BigDecimal nouveauSalaire;

    @Column(name = "date_mouvement")
    private LocalDate dateMovement;

    @Column(columnDefinition = "TEXT")
    private String motif;

    @Column(name = "valideur_id")
    private Integer valideurId;
}
