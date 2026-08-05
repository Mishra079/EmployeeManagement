package com.ems.employeemanagement.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDto {

    private long totalEmployees;
    private long activeEmployees;
    private long totalDepartments;
    private BigDecimal averageSalary;
    private List<DepartmentResponseDto> departments;
}
