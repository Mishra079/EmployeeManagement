package com.ems.employeemanagement.mapper;

import com.ems.employeemanagement.dto.EmployeeRequestDto;
import com.ems.employeemanagement.dto.EmployeeResponseDto;
import com.ems.employeemanagement.entity.Department;
import com.ems.employeemanagement.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {

    public Employee toEntity(EmployeeRequestDto dto, Department department) {
        return Employee.builder()
                .employeeCode(dto.getEmployeeCode())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .gender(dto.getGender())
                .dateOfBirth(dto.getDateOfBirth())
                .department(department)
                .designation(dto.getDesignation())
                .salary(dto.getSalary())
                .joiningDate(dto.getJoiningDate())
                .address(dto.getAddress())
                .city(dto.getCity())
                .state(dto.getState())
                .country(dto.getCountry())
                .zipCode(dto.getZipCode())
                .status(dto.getStatus())
                .profileImage(dto.getProfileImage())
                .build();
    }

    public void updateEntity(Employee employee, EmployeeRequestDto dto, Department department) {
        employee.setEmployeeCode(dto.getEmployeeCode());
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setGender(dto.getGender());
        employee.setDateOfBirth(dto.getDateOfBirth());
        employee.setDepartment(department);
        employee.setDesignation(dto.getDesignation());
        employee.setSalary(dto.getSalary());
        employee.setJoiningDate(dto.getJoiningDate());
        employee.setAddress(dto.getAddress());
        employee.setCity(dto.getCity());
        employee.setState(dto.getState());
        employee.setCountry(dto.getCountry());
        employee.setZipCode(dto.getZipCode());
        employee.setStatus(dto.getStatus());
        employee.setProfileImage(dto.getProfileImage());
    }

    public EmployeeResponseDto toResponseDto(Employee employee) {
        return EmployeeResponseDto.builder()
                .id(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .gender(employee.getGender())
                .dateOfBirth(employee.getDateOfBirth())
                .departmentId(employee.getDepartment().getId())
                .departmentName(employee.getDepartment().getName())
                .designation(employee.getDesignation())
                .salary(employee.getSalary())
                .joiningDate(employee.getJoiningDate())
                .address(employee.getAddress())
                .city(employee.getCity())
                .state(employee.getState())
                .country(employee.getCountry())
                .zipCode(employee.getZipCode())
                .status(employee.getStatus())
                .profileImage(employee.getProfileImage())
                .createdAt(employee.getCreatedAt())
                .updatedAt(employee.getUpdatedAt())
                .build();
    }
}
