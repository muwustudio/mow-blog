@echo off
REM === Mow Blog Deploy ===
cd /d D:\Castiel\Estate\Projects\mow-blog

echo.
echo [1/2] Building...
call npm run build
if errorlevel 1 (
    echo Build FAILED!
    pause
    exit /b 1
)

echo.
echo [2/2] Deploying to Cloudflare Pages...
call npx wrangler pages deploy dist --project-name=mow-blog --branch=main
if errorlevel 1 (
    echo Deploy FAILED!
    pause
    exit /b 1
)

echo.
echo Done! Visit https://mow-blog.pages.dev
pause
