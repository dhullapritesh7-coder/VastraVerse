# 🌿 VastraVerse: Sustainable Fashion E-Commerce Platform

A clean, responsive full-stack web application for sustainable clothing, displaying handcrafted Indian organic cottons, khadi, bamboo linen, and cruelty-free silk.

---

## 🏛️ Four-Phase Curriculum Mapping

| Phase | Technology | Description | Syllabus Experiments |
| :--- | :--- | :--- | :--- |
| **Phase 1: Front-End (React)** | React 18 SPA | Responsive storefront with catalog browsing, multidimensional filtering, product modals, cart drawer, and **Admin Dashboard** for inventory management. | **Expt 2–3**: React UI & State Management |
| **Phase 2: Backend (Kotlin + Spring Boot)** | Kotlin + Spring Boot REST API | Enterprise Spring Boot backend with REST Controllers, JPA Repositories, and Service layer (`backend-kotlin/`). | **Expt 6–9**: Spring REST APIs & CRUD Operations |
| **Phase 3: Database Integration** | Spring Data JPA + H2 / Relational DB | Persistent relational storage for products, users, and orders with automated schema management (`data.sql`). | **Expt 7**: Persistent Database Integration |
| **Phase 4: Authentication** | Role-Based Access Control (RBAC) | Segregated roles (**Admin** vs **Customer**) with password verification and protected admin routes. | **Expt 8**: Role-Based Authentication & Authorization |

---

## 🎯 Key Application Features

1. **Online Fashion Catalog**:
   - Displays sustainable garments (Kurtas, Shirts, Dresses, Trousers, Jackets).
   - High-quality photography, pricing, stock levels, and size options.
2. **Multidimensional Categorization**:
   - Filter by **Category** (Kurtas, Shirts, Dresses, Trousers, Jackets).
   - Filter by **Fit / Type** (Men, Women, Unisex).
   - Filter by **Fabric** (Organic Khadi, Hemp Fiber, Bamboo Linen, Organic Cotton, Ahimsa Silk, Recycled Cotton).
   - Filter by **Price Slider** and text search.
3. **Sustainable Clothing Information & Transparency**:
   - Every product displays freshwater saved (Liters) and carbon offset (kg CO₂e).
   - **Fabric Science Guide** explaining each eco-friendly material.
4. **Shopping Cart & Checkout**:
   - Conscious Bag slide-over drawer with quantity controls, environmental savings tally, and simple checkout.
5. **Admin Dashboard (Full CRUD)**:
   - Dedicated login page with **Admin** credentials (`admin` / `admin123`).
   - View, **Add New Product**, **Edit Product**, and **Delete Product** with instant updates to the database.

---

## 🚀 How to Run the Kotlin + Spring Boot Backend

### Option A: Using IntelliJ IDEA (Recommended for Viva/Presentations)
1. Open **IntelliJ IDEA** (Community or Ultimate edition).
2. Click **Open** and select the folder:
   ```
   C:\Users\Dell\Desktop\VastraVerse\backend-kotlin
   ```
3. IntelliJ will automatically detect [`pom.xml`](backend-kotlin/pom.xml) or [`build.gradle.kts`](backend-kotlin/build.gradle.kts) and download all dependencies.
4. Navigate to:
   `src/main/kotlin/com/vastraverse/VastraverseApplication.kt`
5. Click the green **Run (Play)** button!
6. Set the run configuration's working directory to `backend-kotlin`, then open your browser to:
   👉 **http://localhost:5000**
7. Inspect the embedded database console at:
   👉 **http://localhost:5000/h2-console** (JDBC URL: `jdbc:h2:file:./vastraverse_h2`)

---

### Option B: Using the Command Line (Maven / Gradle)
Java 17 or newer is required. The Maven Wrapper downloads Maven automatically:
```powershell
cd C:\Users\Dell\Desktop\VastraVerse\backend-kotlin
.\mvnw.cmd spring-boot:run
```
*or*
```powershell
gradle bootRun
```
*or simply double-click*:
```
C:\Users\Dell\Desktop\VastraVerse\run_kotlin.bat
```

---

## 📂 Complete Project Structure

```
VastraVerse/
│
├── backend-kotlin/                    # 🎯 PRIMARY ACADEMIC BACKEND (Kotlin + Spring Boot)
│   ├── pom.xml                        # Maven dependencies & Kotlin plugins
│   ├── build.gradle.kts               # Gradle Kotlin DSL configuration
│   └── src/main/
│       ├── kotlin/com/vastraverse/
│       │   ├── VastraverseApplication.kt       # Application Entry Point (@SpringBootApplication)
│       │   ├── config/
│       │   │   ├── CorsConfig.kt               # CORS & Static File Routing
│       │   │   └── SecurityConfig.kt           # Role-Based Security Config (Expt 8)
│       │   ├── controller/
│       │   │   ├── AuthController.kt           # Login & Registration REST API (Expt 8)
│       │   │   ├── ProductController.kt        # Dynamic Categorization & CRUD (Expt 6-9)
│       │   │   ├── OrderController.kt          # Order & Eco Analytics API (Expt 6-9)
│       │   │   └── SustainabilityController.kt # Fabric Guide API
│       │   ├── model/
│       │   │   ├── User.kt                     # JPA User Entity
│       │   │   ├── Product.kt                  # JPA Product Entity
│       │   │   ├── Order.kt                    # JPA Order Entity
│       │   │   └── DTOs.kt                     # Data Transfer Objects
│       │   ├── repository/
│       │   │   ├── UserRepository.kt           # Spring Data JPA Repository
│       │   │   ├── ProductRepository.kt        # Custom JPQL Query Repository
│       │   │   └── OrderRepository.kt          # Eco Savings Aggregates
│       │   └── service/
│       │       ├── AuthService.kt              # Auth Business Logic
│       │       ├── ProductService.kt           # Catalog Search & CRUD Operations
│       │       └── OrderService.kt             # Checkout & Impact Calculation
│       └── resources/
│           ├── application.properties          # Port 5000 & Database Settings
│           └── data.sql                        # Initial Seed Data
│
├── backend/                           # Lightweight Python Flask alternative
│   ├── app.py                         # Flask REST API
│   ├── database.py                    # SQLite database schema
│   ├── seed_data.py                   # Catalog items
│   └── vastraverse.db                 # SQLite database file
│
├── frontend/                          # Single-Page Application (React 18)
│   ├── index.html                     # HTML Shell with Tailwind CSS
│   ├── app.js                         # React components (JSX source)
│   ├── app.bundle.js                  # Precompiled JavaScript bundle
│   ├── styles.css                     # Earthy styling
│   ├── react.production.min.js        # Local React runtime
│   └── react-dom.production.min.js    # Local ReactDOM runtime
│
├── run_kotlin.bat                     # Kotlin backend launcher
├── run.bat                            # 1-click Kotlin backend launcher
├── check_db.bat                       # 1-click database inspector
├── build_frontend.bat                 # 1-second JSX compiler
└── README.md
```
