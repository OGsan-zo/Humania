package com.mg.humania.backend.repository.employe;

import com.mg.humania.backend.entity.employe.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeRepository extends JpaRepository<Employe, Integer> {

    Optional<Employe> findByMatricule(String matricule);

    List<Employe> findByStatut(String statut);

    @Query(value = "SELECT * FROM v_employes_complets WHERE statut_employe = :statut", nativeQuery = true)
    List<Employe> findAllCompletsByStatut(@Param("statut") String statut);

    @Query(value = "SELECT * FROM v_employes_complets", nativeQuery = true)
    List<Employe> findAllComplets();
}
