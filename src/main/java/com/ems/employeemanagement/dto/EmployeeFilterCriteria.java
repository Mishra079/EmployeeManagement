package com.ems.employeemanagement.dto;

import com.ems.employeemanagement.entity.EmployeeStatus;
import lombok.*;

import java.math.BigDecimal;

/**
 * Criteria object for dynamic employee filtering via Specification API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeFilterCriteria {

    private String firstName;
    private String lastName;
    private String department;
    private String designation;
    private String email;
    private EmployeeStatus status;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
}
