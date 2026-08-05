package com.ems.employeemanagement.repository;

import com.ems.employeemanagement.dto.EmployeeFilterCriteria;
import com.ems.employeemanagement.entity.Employee;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Builds dynamic JPA Specifications for employee filtering.
 */
public final class EmployeeSpecification {

    private EmployeeSpecification() {
    }

    public static Specification<Employee> withFilters(EmployeeFilterCriteria criteria) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(criteria.getFirstName())) {
                predicates.add(cb.like(
                        cb.lower(root.get("firstName")),
                        "%" + criteria.getFirstName().toLowerCase() + "%"));
            }
            if (StringUtils.hasText(criteria.getLastName())) {
                predicates.add(cb.like(
                        cb.lower(root.get("lastName")),
                        "%" + criteria.getLastName().toLowerCase() + "%"));
            }
            if (StringUtils.hasText(criteria.getDepartment())) {
                predicates.add(cb.like(
                        cb.lower(root.get("department").get("name")),
                        "%" + criteria.getDepartment().toLowerCase() + "%"));
            }
            if (StringUtils.hasText(criteria.getDesignation())) {
                predicates.add(cb.like(
                        cb.lower(root.get("designation")),
                        "%" + criteria.getDesignation().toLowerCase() + "%"));
            }
            if (StringUtils.hasText(criteria.getEmail())) {
                predicates.add(cb.like(
                        cb.lower(root.get("email")),
                        "%" + criteria.getEmail().toLowerCase() + "%"));
            }
            if (criteria.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), criteria.getStatus()));
            }
            if (criteria.getMinSalary() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("salary"), criteria.getMinSalary()));
            }
            if (criteria.getMaxSalary() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("salary"), criteria.getMaxSalary()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
