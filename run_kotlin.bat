@echo off
echo =====================================================================
echo       VASTRAVERSE: KOTLIN + SPRING BOOT BACKEND RUNNER
echo =====================================================================
echo.

cd /d "%~dp0backend-kotlin"

if exist mvnw.cmd (
    echo [OK] Found Maven Wrapper. Starting Spring Boot Kotlin Backend...
    call mvnw.cmd spring-boot:run
    goto end
)

where mvn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Found Maven. Starting Spring Boot Kotlin Backend...
    mvn spring-boot:run
    goto end
)

where gradle >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Found Gradle. Starting Spring Boot Kotlin Backend...
    gradle bootRun
    goto end
)

echo =====================================================================
echo HOW TO RUN THE KOTLIN + SPRING BOOT BACKEND:
echo =====================================================================
echo 1. Open IntelliJ IDEA (Community or Ultimate)
echo 2. Click "Open" and select the folder:
echo    %~dp0backend-kotlin
echo 3. IntelliJ will automatically detect pom.xml and build.gradle.kts.
echo 4. Open src/main/kotlin/com/vastraverse/VastraverseApplication.kt
echo 5. Click the green "Play" (Run) button!
echo.
echo The Kotlin backend runs on http://localhost:5000 and connects to:
echo - Frontend: http://localhost:5000
echo - H2 Database Console: http://localhost:5000/h2-console
echo =====================================================================
echo.
pause

:end
