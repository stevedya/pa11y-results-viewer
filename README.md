### Pa11y Audit Viewer
Used to view pa11y audits in a clean way.

### Compiling styles
`npx tailwindcss -i ./css/tailwind.css -o ./css/main.css --watch`

### Compiling js 
`npm run watch`

### Checking pa11y
This command will output a results.json which is used inside of app.js.
If using a threshold enter the number when running the command.
`pa11y-ci --threshold 10` 