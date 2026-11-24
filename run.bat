@echo off
title TextTrace - Full Stack Server (Frontend and Backend)
cd /d "%~dp0"

echo ===================================================
echo   TextTrace: Document Similarity Checker
echo   Rayat Bahra University - IAA Algorithms Project
echo   Author: Harsh Garg
echo ===================================================
echo.

:: Detect Python from virtual environment or system PATH
set "PY_EXE=venv\Scripts\python.exe"
if not exist "%PY_EXE%" (
    set "PY_EXE=python"
)

:: Verify Python installation
"%PY_EXE%" --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python was not found.
    echo Please ensure Python 3 is installed and added to PATH.
    echo.
    pause
    exit /b 1
)

:: Set Python path so root and backend packages are discovered seamlessly
set "PYTHONPATH=%~dp0;%~dp0backend;%PYTHONPATH%"

echo [Architecture Status]
echo   - Frontend: .\frontend\ (HTML5 UI, CSS Themes, DSA Visualizer)
echo   - Backend:  .\backend\  (Flask REST API, Rabin-Karp, Merge Sort)
echo.
echo Starting server...
echo.

:: Automatically open browser once server starts
start "" powershell -WindowStyle Hidden -Command "Start-Sleep -Seconds 1.5; Start-Process 'http://127.0.0.1:5000/'"

:: Run the Flask server
"%PY_EXE%" app.py

if errorlevel 1 (
    echo.
    echo [ERROR] Server terminated with an error.
    echo.
    pause
)
