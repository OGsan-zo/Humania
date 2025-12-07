package com.mg.humania.backend.repository.contrat;

import com.mg.humania.backend.entity.contrat.Contrat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContratRepository extends JpaRepository<Contrat, Integer> {

    Optional<Contrat> findByEmployeId(Integer employeId);

    List<Contrat> findByTypeContrat(String typeContrat);

    @Query("SELECT c FROM Contrat c WHERE c.dateFin IS NOT NULL AND c.dateFin <= :date")
    List<Contrat> findExpiringContracts(@Param("date") LocalDate date);
}
