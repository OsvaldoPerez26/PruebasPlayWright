const { execSync } = require("child_process");

const testName = process.argv[2];

let testFailed = false;

try {
  console.log(`🎯 Ejecutando test con filtro: "${testName}"`);
  execSync(`npx playwright test -g "${testName}"`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ El test falló, pero continuamos con la generación del documento.');
  testFailed = true;
}

// Esta parte siempre se ejecuta
try {
  console.log('📝 Generando documento Word...');
  execSync(`node utils/generate-word-report.js`, { stdio: 'inherit' });
  console.log('✅ Proceso completado.');
} catch (error) {
  console.error('❌ Error al generar el documento Word:', error.message);
  process.exit(1); // Falla si el doc también falla
}


