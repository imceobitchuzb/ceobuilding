@echo off
echo ========================================================
echo    CEOBUILDING - 3D Architectural Web Construction
echo ========================================================
echo.
echo Zapusk lokalnogo servera...
echo Otkrytie brauzera po adresu: http://localhost:8000
echo Dlya ostanovki nazhmite Ctrl+C
echo.
start http://localhost:8000
python -m http.server 8000
pause
