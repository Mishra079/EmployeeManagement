package com.ems.employeemanagement.service.implementation;

import com.ems.employeemanagement.dto.DashboardStatsDto;
import com.ems.employeemanagement.dto.DepartmentResponseDto;
import com.ems.employeemanagement.entity.EmployeeStatus;
import com.ems.employeemanagement.mapper.DepartmentMapper;
import com.ems.employeemanagement.repository.DepartmentRepository;
import com.ems.employeemanagement.repository.EmployeeRepository;
import com.ems.employeemanagement.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final DepartmentMapper departmentMapper;

    @Override
    public DashboardStatsDto getDashboardStats() {
        log.debug("Fetching dashboard statistics");
        long totalEmployees = employeeRepository.count();
        long activeEmployees = employeeRepository.countByStatus(EmployeeStatus.ACTIVE);
        long totalDepartments = departmentRepository.count();
        BigDecimal averageSalary = employeeRepository.findAverageActiveSalary()
                .setScale(2, RoundingMode.HALF_UP);

        List<DepartmentResponseDto> departments = departmentRepository.findAll().stream()
                .map(dept -> departmentMapper.toResponseDto(dept, employeeRepository.countByDepartmentId(dept.getId())))
                .toList();

        return DashboardStatsDto.builder()
                .totalEmployees(totalEmployees)
                .activeEmployees(activeEmployees)
                .totalDepartments(totalDepartments)
                .averageSalary(averageSalary)
                .departments(departments)
                .build();
    }
}
