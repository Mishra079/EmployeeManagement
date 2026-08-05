package com.ems.employeemanagement.service.implementation;

import com.ems.employeemanagement.dto.EmployeeFilterCriteria;
import com.ems.employeemanagement.dto.EmployeeRequestDto;
import com.ems.employeemanagement.dto.EmployeeResponseDto;
import com.ems.employeemanagement.entity.Department;
import com.ems.employeemanagement.entity.Employee;
import com.ems.employeemanagement.exception.DuplicateEmailException;
import com.ems.employeemanagement.exception.DuplicateEmployeeCodeException;
import com.ems.employeemanagement.exception.ResourceNotFoundException;
import com.ems.employeemanagement.mapper.EmployeeMapper;
import com.ems.employeemanagement.repository.DepartmentRepository;
import com.ems.employeemanagement.repository.EmployeeRepository;
import com.ems.employeemanagement.repository.EmployeeSpecification;
import com.ems.employeemanagement.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeMapper employeeMapper;

    @Override
    public EmployeeResponseDto createEmployee(EmployeeRequestDto requestDto) {
        log.info("Creating employee: {}", requestDto.getEmail());
        validateUniqueConstraints(null, requestDto);
        Department department = findDepartmentOrThrow(requestDto.getDepartmentId());
        Employee employee = employeeMapper.toEntity(requestDto, department);
        Employee saved = employeeRepository.save(employee);
        log.info("Employee created with id: {}", saved.getId());
        return employeeMapper.toResponseDto(saved);
    }

    @Override
    public EmployeeResponseDto updateEmployee(Long id, EmployeeRequestDto requestDto) {
        log.info("Updating employee id: {}", id);
        Employee employee = findEmployeeOrThrow(id);
        validateUniqueConstraints(id, requestDto);
        Department department = findDepartmentOrThrow(requestDto.getDepartmentId());
        employeeMapper.updateEntity(employee, requestDto, department);
        Employee updated = employeeRepository.save(employee);
        return employeeMapper.toResponseDto(updated);
    }

    @Override
    public void deleteEmployee(Long id) {
        log.info("Deleting employee id: {}", id);
        Employee employee = findEmployeeOrThrow(id);
        employeeRepository.delete(employee);
        log.info("Employee deleted id: {}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeResponseDto getEmployeeById(Long id) {
        log.debug("Fetching employee id: {}", id);
        return employeeMapper.toResponseDto(findEmployeeOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeResponseDto> getAllEmployees(Pageable pageable) {
        log.debug("Fetching all employees - page: {}, size: {}", pageable.getPageNumber(), pageable.getPageSize());
        return employeeRepository.findAll(pageable).map(employeeMapper::toResponseDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeResponseDto> searchEmployees(String keyword, Pageable pageable) {
        log.debug("Searching employees with keyword: {}", keyword);
        return employeeRepository.searchEmployees(keyword, pageable).map(employeeMapper::toResponseDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeResponseDto> filterEmployees(EmployeeFilterCriteria criteria, Pageable pageable) {
        log.debug("Filtering employees with criteria: {}", criteria);
        return employeeRepository.findAll(EmployeeSpecification.withFilters(criteria), pageable)
                .map(employeeMapper::toResponseDto);
    }

    private Employee findEmployeeOrThrow(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    private Department findDepartmentOrThrow(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
    }

    private void validateUniqueConstraints(Long id, EmployeeRequestDto requestDto) {
        boolean emailExists = id == null
                ? employeeRepository.existsByEmail(requestDto.getEmail())
                : employeeRepository.existsByEmailAndIdNot(requestDto.getEmail(), id);
        if (emailExists) {
            throw new DuplicateEmailException("Email '" + requestDto.getEmail() + "' is already registered");
        }

        boolean codeExists = id == null
                ? employeeRepository.existsByEmployeeCode(requestDto.getEmployeeCode())
                : employeeRepository.existsByEmployeeCodeAndIdNot(requestDto.getEmployeeCode(), id);
        if (codeExists) {
            throw new DuplicateEmployeeCodeException(
                    "Employee code '" + requestDto.getEmployeeCode() + "' already exists");
        }
    }
}
