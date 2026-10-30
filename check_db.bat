@echo off
set PYTHON_EXE=C:\Users\Dell\AppData\Local\Programs\Python\Python313\python.exe

if not exist "%PYTHON_EXE%" (
    set PYTHON_EXE=python
)

cd /d "%~dp0backend"
"%PYTHON_EXE%" view_db.py

echo.
pause
