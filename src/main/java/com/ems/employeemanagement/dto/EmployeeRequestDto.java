package com.ems.employeemanagement.dto;

import com.ems.employeemanagement.entity.EmployeeStatus;
import com.ems.employeemanagement.entity.Gender;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeRequestDto {

    @NotBlank(message = "Employee code is required")
    @Size(min = 3, max = 20, message = "Employee code must be between 3 and 20 characters")
    @Pattern(regexp = "^[A-Z0-9-]+$", message = "Employee code must contain only uppercase letters, numbers, and hyphens")
    private String employeeCode;

    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String email;

    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Phone number must be 10-15 digits")
    private String phone;

    private Gender gender;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @NotNull(message = "Department ID is required")
    private Long departmentId;

    @NotBlank(message = "Designation is required")
    @Size(max = 100, message = "Designation must not exceed 100 characters")
    private String designation;

    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be a positive value")
    private BigDecimal salary;

    @PastOrPresent(message = "Joining date cannot be in the future")
    private LocalDate joiningDate;

    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    @Size(max = 100, message = "City must not exceed 100 characters")
    private String city;

    @Size(max = 100, message = "State must not exceed 100 characters")
    private String state;

    @Size(max = 100, message = "Country must not exceed 100 characters")
    private String country;

    @Size(max = 10, message = "Zip code must not exceed 10 characters")
    private String zipCode;

    @NotNull(message = "Status is required")
    private EmployeeStatus status;

    @Size(max = 500, message = "Profile image URL must not exceed 500 characters")
    private String profileImage;
}
