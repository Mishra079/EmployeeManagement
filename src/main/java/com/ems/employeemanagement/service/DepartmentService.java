package com.ems.employeemanagement.service;

import com.ems.employeemanagement.dto.DepartmentRequestDto;
import com.ems.employeemanagement.dto.DepartmentResponseDto;

import java.util.List;

public interface DepartmentService {

    DepartmentResponseDto createDepartment(DepartmentRequestDto requestDto);

    DepartmentResponseDto updateDepartment(Long id, DepartmentRequestDto requestDto);

    void deleteDepartment(Long id);

    DepartmentResponseDto getDepartmentById(Long id);

    List<DepartmentResponseDto> getAllDepartments();
}
