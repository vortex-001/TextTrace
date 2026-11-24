@echo off
title TextTrace - Test Suite (pytest)
cd /d "%~dp0"

set "PY_EXE=venv\Scripts\python.exe"
if not exist "%PY_EXE%" set "PY_EXE=python"
set "PYTHONPATH=%~dp0;%~dp0backend;%PYTHONPATH%"

echo ===================================================
echo   TextTrace: Running Unit & API Test Suite
echo   Testing: Tokenizer, Rabin-Karp, Merge Sort, LCS
echo ===================================================
echo.

"%PY_EXE%" -m pytest -v

echo.
echo ===================================================
pause
