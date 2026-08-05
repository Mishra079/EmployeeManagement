package com.ems.employeemanagement.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentResponseDto {

    private Long id;
    private String name;
    private String description;
    private long employeeCount;
}
