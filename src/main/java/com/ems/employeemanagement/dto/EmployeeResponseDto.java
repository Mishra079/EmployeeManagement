package com.ems.employeemanagement.dto;

import com.ems.employeemanagement.entity.EmployeeStatus;
import com.ems.employeemanagement.entity.Gender;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponseDto {

    private Long id;
    private String employeeCode;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Gender gender;
    private LocalDate dateOfBirth;
    private Long departmentId;
    private String departmentName;
    private String designation;
    private BigDecimal salary;
    private LocalDate joiningDate;
    private String address;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    private EmployeeStatus status;
    private String profileImage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
