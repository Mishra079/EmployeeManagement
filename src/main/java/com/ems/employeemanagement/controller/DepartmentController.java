package com.ems.employeemanagement.controller;

import com.ems.employeemanagement.dto.DepartmentRequestDto;
import com.ems.employeemanagement.dto.DepartmentResponseDto;
import com.ems.employeemanagement.service.DepartmentService;
import com.ems.employeemanagement.util.AppConstants;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for Department CRUD operations.
 * Delegates all business logic to DepartmentService.
 */
@RestController
@RequestMapping(AppConstants.DEPARTMENTS_PATH)
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<DepartmentResponseDto> createDepartment(
            @Valid @RequestBody DepartmentRequestDto requestDto) {
        DepartmentResponseDto response = departmentService.createDepartment(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<DepartmentResponseDto>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponseDto> getDepartmentById(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentResponseDto> updateDepartment(
            @PathVariable Long id,
            @Valid @RequestBody DepartmentRequestDto requestDto) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }
}
