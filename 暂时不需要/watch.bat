@echo off
echo Immaculate Grid Build Progress
echo Press Ctrl+C to exit
echo.

:loop
for /f "delims=" %%i in ('node -e "try{const d=JSON.parse(require('"'"'fs'"'"').readFileSync('"'"'build-cache/fullBuild.json'"'"','"'"'utf-8'"'"'));const p=Math.round(d.length/5126*100);console.log(d.length+'/'+5126+' ('+p+'%)');}catch(e){console.log('reading...');}"') do set progress=%%i
echo %time% %progress%
timeout /t 10 >nul
goto loop
