@echo off
set NODE_EXE=C:\Users\Dell\AppData\Roaming\Antigravity\bin\agy-node.cmd

if not exist "%NODE_EXE%" (
    set NODE_EXE=node
)

echo Compiling frontend/app.js into frontend/app.bundle.js ...
"%NODE_EXE%" -e "const fs = require('fs'); const Babel = require('./frontend/babel.min.js'); const src = fs.readFileSync('./frontend/app.js', 'utf8'); const out = Babel.transform(src, { presets: ['react'] }).code; fs.writeFileSync('./frontend/app.bundle.js', out); console.log('Successfully compiled app.bundle.js (' + out.length + ' bytes)!');"

echo.
echo Done! Refresh your browser to see your frontend changes.
pause
