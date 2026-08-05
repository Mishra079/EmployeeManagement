package com.ems.employeemanagement.exception;

public class DuplicateEmployeeCodeException extends RuntimeException {

    public DuplicateEmployeeCodeException(String message) {
        super(message);
    }
}
