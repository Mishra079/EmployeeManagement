-- ============================================================
-- Employee Management System - MySQL Database Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS employee_management_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE employee_management_db;

-- ============================================================
-- Departments Table
-- ============================================================
CREATE TABLE IF NOT EXISTS departments (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    CONSTRAINT uk_department_name UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_department_name ON departments (name);

-- ============================================================
-- Employees Table
-- ============================================================
CREATE TABLE IF NOT EXISTS employees (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_code  VARCHAR(20)  NOT NULL,
    first_name     VARCHAR(50)  NOT NULL,
    last_name      VARCHAR(50)  NOT NULL,
    email          VARCHAR(100) NOT NULL,
    phone          VARCHAR(15),
    gender         ENUM('MALE', 'FEMALE', 'OTHER'),
    date_of_birth  DATE,
    department_id  BIGINT       NOT NULL,
    designation    VARCHAR(100),
    salary         DECIMAL(12, 2),
    joining_date   DATE,
    address        VARCHAR(255),
    city           VARCHAR(100),
    state          VARCHAR(100),
    country        VARCHAR(100),
    zip_code       VARCHAR(10),
    status         ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    profile_image  VARCHAR(500),
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_employee_code UNIQUE (employee_code),
    CONSTRAINT uk_employee_email UNIQUE (email),
    CONSTRAINT fk_employee_department
        FOREIGN KEY (department_id) REFERENCES departments (id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_employee_code      ON employees (employee_code);
CREATE INDEX idx_employee_email     ON employees (email);
CREATE INDEX idx_employee_status    ON employees (status);
CREATE INDEX idx_employee_department ON employees (department_id);

-- ============================================================
-- Sample Seed Data
-- ============================================================
INSERT INTO departments (name, description) VALUES
    ('Information Technology', 'Software development and IT infrastructure'),
    ('Human Resources', 'Employee relations and recruitment'),
    ('Finance', 'Financial planning and accounting'),
    ('Marketing', 'Brand management and digital marketing'),
    ('Operations', 'Business operations and logistics');

INSERT INTO employees (
    employee_code, first_name, last_name, email, phone, gender,
    date_of_birth, department_id, designation, salary, joining_date,
    address, city, state, country, zip_code, status, profile_image
) VALUES
    ('EMP-001', 'John', 'Doe', 'john.doe@company.com', '9876543210', 'MALE',
     '1990-05-15', 1, 'Senior Software Engineer', 85000.00, '2020-01-10',
     '123 Tech Park', 'Bangalore', 'Karnataka', 'India', '560001', 'ACTIVE',
     'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff'),

    ('EMP-002', 'Jane', 'Smith', 'jane.smith@company.com', '9876543211', 'FEMALE',
     '1988-08-22', 2, 'HR Manager', 75000.00, '2019-06-01',
     '456 HR Avenue', 'Mumbai', 'Maharashtra', 'India', '400001', 'ACTIVE',
     'https://ui-avatars.com/api/?name=Jane+Smith&background=7B68EE&color=fff'),

    ('EMP-003', 'Robert', 'Johnson', 'robert.j@company.com', '9876543212', 'MALE',
     '1992-03-10', 3, 'Financial Analyst', 65000.00, '2021-03-15',
     '789 Finance Street', 'Delhi', 'Delhi', 'India', '110001', 'ACTIVE',
     'https://ui-avatars.com/api/?name=Robert+Johnson&background=228B22&color=fff'),

    ('EMP-004', 'Emily', 'Davis', 'emily.davis@company.com', '9876543213', 'FEMALE',
     '1995-11-30', 4, 'Marketing Specialist', 55000.00, '2022-07-20',
     '321 Market Road', 'Chennai', 'Tamil Nadu', 'India', '600001', 'ACTIVE',
     'https://ui-avatars.com/api/?name=Emily+Davis&background=FF6347&color=fff'),

    ('EMP-005', 'Michael', 'Wilson', 'michael.w@company.com', '9876543214', 'MALE',
     '1987-01-18', 5, 'Operations Lead', 70000.00, '2018-09-05',
     '654 Ops Lane', 'Hyderabad', 'Telangana', 'India', '500001', 'INACTIVE',
     'https://ui-avatars.com/api/?name=Michael+Wilson&background=4682B4&color=fff');
