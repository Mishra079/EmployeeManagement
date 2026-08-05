package com.ems.employeemanagement.mapper;

import com.ems.employeemanagement.dto.DepartmentRequestDto;
import com.ems.employeemanagement.dto.DepartmentResponseDto;
import com.ems.employeemanagement.dto.EmployeeRequestDto;
import com.ems.employeemanagement.dto.EmployeeResponseDto;
import com.ems.employeemanagement.entity.Department;
import com.ems.employeemanagement.entity.Employee;
import org.springframework.stereotype.Component;

/**
 * Manual mapper for converting between entities and DTOs.
 * Keeps mapping logic centralized and decoupled from services.
 */
@Component
public class DepartmentMapper {

    public Department toEntity(DepartmentRequestDto dto) {
        return Department.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .build();
    }

    public void updateEntity(Department department, DepartmentRequestDto dto) {
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());
    }

    public DepartmentResponseDto toResponseDto(Department department) {
        return DepartmentResponseDto.builder()
                .id(department.getId())
                .name(department.getName())
                .description(department.getDescription())
                .employeeCount(department.getEmployees() != null ? department.getEmployees().size() : 0)
                .build();
    }

    public DepartmentResponseDto toResponseDto(Department department, long employeeCount) {
        return DepartmentResponseDto.builder()
                .id(department.getId())
                .name(department.getName())
                .description(department.getDescription())
                .employeeCount(employeeCount)
                .build();
    }
}
