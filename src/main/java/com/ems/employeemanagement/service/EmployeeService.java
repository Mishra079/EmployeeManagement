package com.ems.employeemanagement.service;

import com.ems.employeemanagement.dto.EmployeeFilterCriteria;
import com.ems.employeemanagement.dto.EmployeeRequestDto;
import com.ems.employeemanagement.dto.EmployeeResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmployeeService {

    EmployeeResponseDto createEmployee(EmployeeRequestDto requestDto);

    EmployeeResponseDto updateEmployee(Long id, EmployeeRequestDto requestDto);

    void deleteEmployee(Long id);

    EmployeeResponseDto getEmployeeById(Long id);

    Page<EmployeeResponseDto> getAllEmployees(Pageable pageable);

    Page<EmployeeResponseDto> searchEmployees(String keyword, Pageable pageable);

    Page<EmployeeResponseDto> filterEmployees(EmployeeFilterCriteria criteria, Pageable pageable);
}
