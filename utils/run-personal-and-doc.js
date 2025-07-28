const {execSync} = require("child_process");

const testName=process.argv[2];

try{
    console.log(`Ejecutando tests con filtro: "${testName}"`);
    execSync(`npx playwright test -g "${testName}"`, { stdio: 'inherit' });
  
    console.log('Generando documento Word...');
    execSync(`node utils/generate-word-report.js`, { stdio: 'inherit' });
  
    console.log('Proceso completado.');
  } catch (error) {
    console.error('Error durante la ejecución:', error);
    process.exit(1);
  }