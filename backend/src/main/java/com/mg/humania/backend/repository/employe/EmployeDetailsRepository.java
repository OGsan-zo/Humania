package com.mg.humania.backend.repository.employe;

import com.mg.humania.backend.entity.employe.EmployeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EmployeDetailsRepository extends JpaRepository<EmployeDetails, Integer> {

    Optional<EmployeDetails> findByEmployeId(Integer employeId);
}
