package com.mg.humania.backend.repository.mouvement;

import com.mg.humania.backend.entity.mouvement.HistoriqueMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistoriqueMovementRepository extends JpaRepository<HistoriqueMovement, Integer> {

    List<HistoriqueMovement> findByEmployeId(Integer employeId);

    List<HistoriqueMovement> findByTypeMovementId(Integer typeMovementId);
}
