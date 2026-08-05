package com.ems.employeemanagement.service.implementation;

import com.ems.employeemanagement.dto.DepartmentRequestDto;
import com.ems.employeemanagement.dto.DepartmentResponseDto;
import com.ems.employeemanagement.entity.Department;
import com.ems.employeemanagement.exception.ResourceNotFoundException;
import com.ems.employeemanagement.exception.ValidationException;
import com.ems.employeemanagement.mapper.DepartmentMapper;
import com.ems.employeemanagement.repository.DepartmentRepository;
import com.ems.employeemanagement.repository.EmployeeRepository;
import com.ems.employeemanagement.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentMapper departmentMapper;

    @Override
    public DepartmentResponseDto createDepartment(DepartmentRequestDto requestDto) {
        log.info("Creating department: {}", requestDto.getName());
        if (departmentRepository.existsByNameIgnoreCase(requestDto.getName())) {
            throw new ValidationException("Department with name '" + requestDto.getName() + "' already exists");
        }
        Department department = departmentMapper.toEntity(requestDto);
        Department saved = departmentRepository.save(department);
        log.info("Department created with id: {}", saved.getId());
        return departmentMapper.toResponseDto(saved, 0);
    }

    @Override
    public DepartmentResponseDto updateDepartment(Long id, DepartmentRequestDto requestDto) {
        log.info("Updating department id: {}", id);
        Department department = findDepartmentOrThrow(id);
        if (departmentRepository.existsByNameIgnoreCaseAndIdNot(requestDto.getName(), id)) {
            throw new ValidationException("Department with name '" + requestDto.getName() + "' already exists");
        }
        departmentMapper.updateEntity(department, requestDto);
        Department updated = departmentRepository.save(department);
        long count = employeeRepository.countByDepartmentId(id);
        return departmentMapper.toResponseDto(updated, count);
    }

    @Override
    public void deleteDepartment(Long id) {
        log.info("Deleting department id: {}", id);
        Department department = findDepartmentOrThrow(id);
        long employeeCount = employeeRepository.countByDepartmentId(id);
        if (employeeCount > 0) {
            throw new ValidationException(
                    "Cannot delete department '" + department.getName() + "' because it has " + employeeCount + " employee(s)");
        }
        departmentRepository.delete(department);
        log.info("Department deleted id: {}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentResponseDto getDepartmentById(Long id) {
        log.debug("Fetching department id: {}", id);
        Department department = findDepartmentOrThrow(id);
        long count = employeeRepository.countByDepartmentId(id);
        return departmentMapper.toResponseDto(department, count);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponseDto> getAllDepartments() {
        log.debug("Fetching all departments");
        return departmentRepository.findAll().stream()
                .map(dept -> departmentMapper.toResponseDto(dept, employeeRepository.countByDepartmentId(dept.getId())))
                .toList();
    }

    private Department findDepartmentOrThrow(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
    }
}
