package com.ems.employeemanagement.controller;

import com.ems.employeemanagement.dto.EmployeeFilterCriteria;
import com.ems.employeemanagement.dto.EmployeeRequestDto;
import com.ems.employeemanagement.dto.EmployeeResponseDto;
import com.ems.employeemanagement.entity.EmployeeStatus;
import com.ems.employeemanagement.service.EmployeeService;
import com.ems.employeemanagement.util.AppConstants;
import com.ems.employeemanagement.util.PaginationUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

/**
 * REST controller for Employee CRUD, search, filter, pagination, and sorting.
 */
@RestController
@RequestMapping(AppConstants.EMPLOYEES_PATH)
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeResponseDto> createEmployee(
            @Valid @RequestBody EmployeeRequestDto requestDto) {
        EmployeeResponseDto response = employeeService.createEmployee(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<Page<EmployeeResponseDto>> getAllEmployees(
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE) int page,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SIZE) int size,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY) String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_DIRECTION) String direction) {
        Pageable pageable = PaginationUtils.createPageable(page, size, sortBy, direction);
        return ResponseEntity.ok(employeeService.getAllEmployees(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequestDto requestDto) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<EmployeeResponseDto>> searchEmployees(
            @RequestParam String keyword,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE) int page,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SIZE) int size,
            @RequestParam(defaultValue = "firstName") String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_DIRECTION) String direction) {
        Pageable pageable = PaginationUtils.createPageable(page, size, sortBy, direction);
        return ResponseEntity.ok(employeeService.searchEmployees(keyword, pageable));
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<EmployeeResponseDto>> filterEmployees(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String designation,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) EmployeeStatus status,
            @RequestParam(required = false) BigDecimal minSalary,
            @RequestParam(required = false) BigDecimal maxSalary,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE) int page,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SIZE) int size,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY) String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_DIRECTION) String direction) {

        EmployeeFilterCriteria criteria = EmployeeFilterCriteria.builder()
                .firstName(firstName)
                .lastName(lastName)
                .department(department)
                .designation(designation)
                .email(email)
                .status(status)
                .minSalary(minSalary)
                .maxSalary(maxSalary)
                .build();

        Pageable pageable = PaginationUtils.createPageable(page, size, sortBy, direction);
        return ResponseEntity.ok(employeeService.filterEmployees(criteria, pageable));
    }
}
