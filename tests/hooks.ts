import { test as base } from '@playwright/test';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';



const jsonPath = path.resolve(__dirname, '../test-info.json');
const screenshotsDir = path.resolve(__dirname, '../screenshots');

const test = base.extend({});

test.afterEach(async ({}, testInfo) => {
  let testMetadata;
  console.log("HHHHHHHH")
  if (existsSync(jsonPath)) {
    const fileContent = readFileSync(jsonPath, 'utf-8');
    testMetadata = JSON.parse(fileContent);
  } else {
    console.error(`El archivo ${jsonPath} no existe.`);
    return;
  }

  testMetadata.status = testInfo.status;
  writeFileSync(jsonPath, JSON.stringify(testMetadata, null, 2));

  console.log(`Estado actualizado en JSON: ${testMetadata.status}`);

  try {
    // Ejecuta el comando que genera el documento (ajusta la ruta y comando según tu caso)
    execSync('node utils/generate-word-report.js', { stdio: 'inherit' });
    console.log('✅ Documento Word generado correctamente.');
  } catch (error) {
    console.error('❌ Error al generar el documento Word:', error);
  }
});

test.beforeAll(()=>{
  if (fs.existsSync(screenshotsDir)) {
    fs.readdirSync(screenshotsDir).forEach((file) => {
      const filePath = path.join(screenshotsDir, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    });
    console.log('🧹 Carpeta screenshots limpiada.');
  }
});

export { test };