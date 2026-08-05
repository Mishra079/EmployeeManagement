package com.ems.employeemanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Department entity representing an organizational unit.
 * One department can have many employees (One-to-Many relationship).
 */
@Entity
@Table(name = "departments", indexes = {
        @Index(name = "idx_department_name", columnList = "name", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = false)
    @Builder.Default
    private List<Employee> employees = new ArrayList<>();
}
