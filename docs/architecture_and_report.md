# VastraVerse: Sustainable Fashion E-Commerce Platform
## Academic Lab Project Documentation (Four-Phase Curriculum Mapping)

---

### 1. Project Overview
**VastraVerse** is a full-stack sustainable fashion platform built to display and sell eco-friendly clothing while highlighting transparent fabric origins and environmental impact metrics.

---

### 2. Four-Phase Curriculum Mapping

| Phase | Technology | Implementation Details | Academic Lab Experiments |
| :--- | :--- | :--- | :--- |
| **Front-End (React)** | React 18 SPA | Responsive product catalog, multidimensional filters, modal views, shopping bag, and **Admin Inventory Management Console**. | **Expt 2–3**: Modern Component-based UI & State Management |
| **Backend (Kotlin + Spring Boot)** | Kotlin + Spring Boot REST API | Enterprise CRUD controllers, services, JPA repositories, dynamic filtering & analytics. | **Expt 6–9**: Spring REST Controllers & Service Layer Architecture |
| **Database Integration** | Spring Data JPA + H2 / Relational DB | Persistent storage of users, products, and order histories with automatic DDL and seeding. | **Expt 7**: Persistent Database Storage & JPA Queries |
| **Authentication** | Role-Based Access Control (RBAC) | Segregated roles (**Admin** vs **Customer**) with password verification and protected routes. | **Expt 8**: Role-Based Authentication & Security |

---

### 3. Backend Architecture (Kotlin + Spring Boot)

Located in: `backend-kotlin/`

```
backend-kotlin/
├── pom.xml                                      # Maven configuration
├── build.gradle.kts                             # Gradle Kotlin DSL configuration
└── src/main/
    ├── kotlin/com/vastraverse/
    │   ├── VastraverseApplication.kt            # Application Entry Point (@SpringBootApplication)
    │   ├── config/
    │   │   ├── CorsConfig.kt                    # CORS & Static File Routing
    │   │   └── SecurityConfig.kt                # RBAC Helper & Security Config (Expt 8)
    │   ├── controller/
    │   │   ├── AuthController.kt                # Authentication Endpoints (Expt 8)
    │   │   ├── ProductController.kt             # Product CRUD & Categorization (Expt 6-9)
    │   │   ├── OrderController.kt               # Orders & Analytics Endpoints (Expt 6-9)
    │   │   └── SustainabilityController.kt      # Fabric Guide API
    │   ├── model/
    │   │   ├── User.kt                          # JPA Entity: Users Table
    │   │   ├── Product.kt                       # JPA Entity: Products Table
    │   │   ├── Order.kt                         # JPA Entity: Orders Table
    │   │   └── DTOs.kt                          # Request/Response Data Classes
    │   ├── repository/
    │   │   ├── UserRepository.kt                # Spring Data JPA Repository
    │   │   ├── ProductRepository.kt             # Custom JPQL Query Repository
    │   │   └── OrderRepository.kt               # Order & Environmental Impact Aggregates
    │   └── service/
    │       ├── AuthService.kt                   # Auth Business Logic
    │       ├── ProductService.kt                # Product Search & CRUD Logic
    │       └── OrderService.kt                  # Order Processing & Impact Calculation
    └── resources/
        ├── application.properties               # Database & Server Port Configuration
        └── data.sql                             # Initial Database Seed Script
```

---

### 4. Core Endpoints Summary

- `GET /api/products`: Retrieve all products with optional filters (`category`, `type`, `fabric`, `max_price`, `search`).
- `GET /api/products/{id}`: Retrieve details of a single product.
- `POST /api/products`: Admin CRUD - Add new sustainable clothing item.
- `PUT /api/products/{id}`: Admin CRUD - Update clothing item details/price/stock.
- `DELETE /api/products/{id}`: Admin CRUD - Delete clothing item from database.
- `POST /api/auth/login`: Role-based authentication (Admin vs Customer).
- `POST /api/auth/register`: New user registration.
- `GET /api/orders` & `POST /api/orders`: Order placement and history with water and carbon tracking.
- `GET /api/sustainability/fabrics`: Sustainable fabric educational transparency guide.
- `GET /api/admin/analytics`: Summary counts of products, orders, and total water/carbon conserved.
