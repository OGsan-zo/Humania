package com.mg.humania.backend.repository.document;

import com.mg.humania.backend.entity.document.EmployeDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmployeDocumentRepository extends JpaRepository<EmployeDocument, Integer> {

    List<EmployeDocument> findByEmployeId(Integer employeId);

    List<EmployeDocument> findByTypeDocumentId(Integer typeDocumentId);

    @Query("SELECT d FROM EmployeDocument d WHERE d.dateExpiration IS NOT NULL AND d.dateExpiration <= :date")
    List<EmployeDocument> findExpiringDocuments(@Param("date") LocalDate date);

    @Query("SELECT d FROM EmployeDocument d WHERE d.employeId = :employeId AND d.dateExpiration IS NOT NULL AND d.dateExpiration <= :date")
    List<EmployeDocument> findExpiringDocumentsByEmploye(@Param("employeId") Integer employeId, @Param("date") LocalDate date);
}
