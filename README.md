# Employee Management System

A production-quality full-stack Employee Management System built with **Spring Boot 3.2** (Java 17) and **React 18**.

## Tech Stack

### Backend
- Java 17, Spring Boot 3.2.5, Spring Web, Spring Data JPA
- MySQL, Lombok, Spring Validation, ModelMapper
- Layered Architecture with DTO pattern

### Frontend
- React 18, Vite, React Router 6, Axios
- Bootstrap 5, React Toastify

---

## Project Structure

```
employee-management-system-backend/
├── pom.xml
├── sql/schema.sql
├── postman/Employee_Management_System.postman_collection.json
├── src/main/java/com/ems/employeemanagement/
│   ├── EmployeeManagementApplication.java
│   ├── controller/          # REST endpoints (no business logic)
│   ├── service/             # Service interfaces
│   │   └── implementation/  # Business logic
│   ├── repository/          # JPA repositories + Specification
│   ├── entity/              # JPA entities & enums
│   ├── dto/                 # Request/Response DTOs
│   ├── exception/           # Custom exceptions + global handler
│   ├── configuration/       # CORS, ModelMapper beans
│   ├── mapper/              # Entity ↔ DTO mapping
│   └── util/                # Pagination & constants
├── src/main/resources/
│   └── application.properties
└── frontend/                # React SPA
    └── src/
        ├── components/      # Reusable UI components
        ├── pages/           # Route pages
        ├── services/        # Axios API layer
        ├── hooks/           # Custom hooks
        ├── context/         # Auth context
        ├── layouts/         # Main layout + protected routes
        ├── routing/         # App routes
        └── utils/           # Form validators
```

---

## Prerequisites

- **JDK 17** 
- **Maven 3.8+**
- **MySQL 8.0+**
- **Node.js 18+** and npm

---

## Quick Start

### 1. Database Setup

```bash
mysql -u root -p < sql/schema.sql
```

Or let Hibernate auto-create tables (`spring.jpa.hibernate.ddl-auto=update`).

Update credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

### 2. Run Backend

```bash
mvn spring-boot:run
```

API runs at: `http://localhost:8686`

### 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

**Login credentials (demo):** `admin@ems.com` / `admin123`

---

## REST API Endpoints

### Departments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/departments` | Create department |
| GET | `/api/departments` | Get all departments |
| GET | `/api/departments/{id}` | Get by ID |
| PUT | `/api/departments/{id}` | Update department |
| DELETE | `/api/departments/{id}` | Delete department |

### Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employees` | Create employee |
| GET | `/api/employees?page=0&size=10&sortBy=firstName&direction=asc` | Paginated list |
| GET | `/api/employees/{id}` | Get by ID |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
| GET | `/api/employees/search?keyword=john` | Search employees |
| GET | `/api/employees/filter?department=IT&status=ACTIVE` | Filter employees |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Dashboard statistics |

---

## API Testing Guide

1. Import `postman/Employee_Management_System.postman_collection.json` into Postman
2. Set `baseUrl` variable to `http://localhost:8080`
3. **Test order:**
   - Create departments first
   - Create employees (requires valid `departmentId`)
   - Test search, filter, pagination
   - Test update and delete

### Sample Create Employee Request

```json
POST /api/employees
{
  "employeeCode": "EMP-006",
  "firstName": "Alice",
  "lastName": "Brown",
  "email": "alice@company.com",
  "phone": "9876543215",
  "gender": "FEMALE",
  "dateOfBirth": "1993-04-12",
  "departmentId": 1,
  "designation": "Developer",
  "salary": 55000,
  "joiningDate": "2023-06-01",
  "status": "ACTIVE"
}
```

### Error Response Format

```json
{
  "timestamp": "2026-07-28T10:30:00",
  "status": 404,
  "message": "Employee not found with id: 99",
  "path": "/api/employees/99"
}
```

---

## Expected UI Screenshots

### Login Page
- Purple gradient background, centered white card
- Email/password fields, "Sign In" button
- Demo credentials shown at bottom

### Dashboard
- 4 stat cards: Total Employees, Active Employees, Departments, Average Salary
- Department overview table below cards
- Dark sidebar with navigation links

### Employees Page
- Search bar, department dropdown filter, status filter
- Table with profile images, employee code, name, department, salary, status badges
- Sortable columns, pagination, Edit/Delete/View action buttons
- Confirmation modal before delete

### Employee Form (Add/Edit)
- Multi-column responsive form with validation errors
- Department dropdown, status selector, date pickers

### Departments Page
- Table listing all departments with employee counts
- Add/Edit/Delete with confirmation dialog

---

## Deployment Guide

### Backend (JAR)

```bash
mvn clean package -DskipTests
java -jar target/employee-management-system-1.0.0.jar
```

**Production `application.properties`:**
```properties
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.datasource.url=jdbc:mysql://your-db-host:3306/employee_management_db
```

### Frontend

```bash
cd frontend
npm run build
```

Deploy `frontend/dist/` to Nginx, AWS S3 + CloudFront, or any static host.

Set `VITE_API_BASE_URL=https://your-api-domain.com/api` before building.

### Docker (Optional)

```dockerfile
# Backend Dockerfile
FROM eclipse-temurin:21-jre
COPY target/employee-management-system-1.0.0.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

---

## Architecture Highlights

| Principle | Implementation |
|-----------|---------------|
| Layered Architecture | Controller → Service → Repository |
| DTO Pattern | Entities never exposed via API |
| Constructor Injection | `@RequiredArgsConstructor` with Lombok |
| Global Exception Handling | `@RestControllerAdvice` with consistent JSON errors |
| Pagination & Sorting | Spring `Pageable` with query params |
| Dynamic Filtering | JPA Specification API |
| Search | JPQL query across multiple fields |
| Validation | Bean Validation on DTOs |
| CORS | Configured for React dev server |

---

## Future Improvements

- JWT authentication with Spring Security (ADMIN/EMPLOYEE roles)
- File upload for profile images (S3/local storage)
- Audit logging with `@CreatedBy` / `@LastModifiedBy`
- Unit & integration tests (JUnit 5, MockMvc, Testcontainers)
- API documentation with Swagger/OpenAPI
- Redis caching for dashboard stats
- Email notifications on employee creation
- Export employees to CSV/PDF
- Docker Compose for one-command setup
- CI/CD pipeline with GitHub Actions

---

## Best Practices Followed

- SOLID principles with interface-based services
- No business logic in controllers
- Meaningful logging with SLF4J
- Database indexes on frequently queried columns
- Foreign key constraints with RESTRICT on delete
- Responsive mobile-first frontend design
- Reusable React components
- Centralized Axios configuration with error interceptors
- Environment variables for API URL configuration
- Confirmation dialogs for destructive actions
- Toast notifications for user feedback

---

## License

MIT License
