package com.mg.humania.backend.entity.employe;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "cin")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 50)
    private String numeroCin;

    @Column(name = "date_delivrance")
    private LocalDate dateDelivrance;

    @Column(name = "lieu_delivrance", length = 100)
    private String lieuDelivrance;

    @Column(name = "lieu_naissance", length = 150)
    private String lieuNaissance;

    @Column(length = 100)
    private String nationalite;
}
