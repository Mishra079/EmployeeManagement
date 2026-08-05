package com.ems.employeemanagement.repository;

import com.ems.employeemanagement.entity.Employee;
import com.ems.employeemanagement.entity.EmployeeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {

    Optional<Employee> findByEmail(String email);

    Optional<Employee> findByEmployeeCode(String employeeCode);

    boolean existsByEmail(String email);

    boolean existsByEmployeeCode(String employeeCode);

    boolean existsByEmailAndIdNot(String email, Long id);

    boolean existsByEmployeeCodeAndIdNot(String employeeCode, Long id);

    long countByStatus(EmployeeStatus status);

    @Query("SELECT COALESCE(AVG(e.salary), 0) FROM Employee e WHERE e.status = 'ACTIVE'")
    BigDecimal findAverageActiveSalary();

    @Query("""
            SELECT e FROM Employee e
            WHERE LOWER(e.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(e.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(e.designation) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(e.department.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    Page<Employee> searchEmployees(@Param("keyword") String keyword, Pageable pageable);

    long countByDepartmentId(Long departmentId);
}
