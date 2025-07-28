import { test, expect,chromium } from '@playwright/test';
import fs from 'fs'
test.use({headless:false,
 
  });
const stepsLog=[];
test('testPOC', async () => {
  const browser = await chromium.launch({ headless: false }); // mejor ver lo que pasa
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();
  test.setTimeout(6 * 60 * 1000);
  await page.goto('https://hcm19preview.sapsf.com/login?company=undergrounT1');
  await page.locator('//*[@id="j_username"]').fill("moises.ibarra@dxgrow.com");
  await page.locator('//*[@id="j_password"]').fill("PeIs1105+");
  await page.screenshot({path:'screenshots/login.png', fullPage:false})
  stepsLog.push({description: 'Se ingresa al login y se ingresan datos de manera correcta', image:'screenshots/login.png'});
  await page.locator('//*[@id="logOnFormSubmit"]/div').click();
  //await page.waitForTimeout(10000);
  await expect( await page.getByRole('link', { name: 'Imagen de logotipo. Enlace a' })).toBeVisible();
  await page.screenshot({path:'screenshots/loginSucces.png', fullPage:false})
  stepsLog.push({description: 'Se iingresa de manera correcta a plataforma', image:'screenshots/loginSucces.png'});
  await page.getByRole('link', { name: 'Ver organigrama' }).click();
  await page.waitForSelector('ui5-busy-indicator-xweb-company-orgchart');
  await page.waitForSelector('ui5-busy-indicator-xweb-company-orgchart:not([busy="true"])');
  const cards = page.locator('ui5-busy-indicator-xweb-company-orgchart .OrgchartCard_OrgchartCardTitleText__5I174');
  await expect(cards.first()).toBeVisible({ timeout: 10000 });
  await page.screenshot({path:'screenshots/organigrama.png', fullPage:false})
  stepsLog.push({description: 'Se ve el organigrama de forma correcta', image:'screenshots/organigrama.png'});

  const count = await cards.count();
  console.log(count);

  const nodo= page.locator('ui5-busy-indicator-xweb-company-orgchart .OrgchartCard_OrgchartCardTitleText__5I174',{hasText:'MARIANELLA MENDOZA'});
  await expect(nodo).toBeVisible({ timeout: 10000 });
  await nodo.click();
  await page.screenshot({path:'screenshots/organigrama1.png', fullPage:false})
  stepsLog.push({description: 'Se da clic a un colaborador', image:'screenshots/organigrama1.png'});
  const nodo1= page.locator('ui5-busy-indicator-xweb-company-orgchart .OrgchartCard_OrgchartCardTitleText__5I174',{hasText:'VERÓNICA APARICIO'});
  await expect(nodo1).toBeVisible({ timeout: 10000 });
  await nodo1.click();
  await page.screenshot({path:'screenshots/organigrama2.png', fullPage:false})
  stepsLog.push({description: 'Se da clic a un colaborador', image:'screenshots/organigrama2.png'});

  const nodo2= page.locator('ui5-busy-indicator-xweb-company-orgchart .OrgchartCard_OrgchartCardTitleText__5I174',{hasText:'REBECA PAOLA RAMIREZ'});
  await expect(nodo2).toBeVisible({ timeout: 20000 });
  await page.getByRole('button', { name: 'REBECA PAOLA RAMIREZ Ver' }).click();
  await page.screenshot({path:'screenshots/colaborador.png', fullPage:false})
  stepsLog.push({description: 'Se da clic a ver colaborador', image:'screenshots/colaborador.png'});

  await page.getByRole('button', { name: 'Resaltado' }).click();
  
  const perfilComp=page.getByRole('button', { name: 'Perfil completo' });
  await expect(perfilComp).toBeVisible({ timeout: 20000 });
  await perfilComp.click();
  await page.screenshot({path:'screenshots/colaborador1.png', fullPage:false})
  stepsLog.push({description: 'Se visualiza el perfil completo', image:'screenshots/colaborador1.png'});
  const accionesBtn = page.locator('//*[@id="__button2-BDI-content"]');
  await expect(accionesBtn).toBeVisible({ timeout: 50000 }); // mejor práctica que timeout fijo
  await accionesBtn.click();
  await page.screenshot({path:'screenshots/colaborador2.png', fullPage:false})
  stepsLog.push({description: 'Se da clic a Acciones', image:'screenshots/colaborador2.png'});
  //
  await page.getByText('Cambiar información de puesto').click();
  await page.screenshot({path:'screenshots/colaborador3.png', fullPage:false})
  stepsLog.push({description: 'Se selecciona Cambiar informacion del puesto', image:'screenshots/colaborador3.png'});
  await page.getByRole('checkbox', { name: 'Job Information' }).click();
  await page.getByRole('checkbox', { name: 'Relaciones del puesto' }).click();
  await page.getByRole('checkbox', { name: 'Compensation Information' }).click();
  await page.screenshot({path:'screenshots/colaborador4.png', fullPage:false})
  stepsLog.push({description: 'Se seleccionan todos los checks correctamente', image:'screenshots/colaborador4.png'});
  await page.getByLabel('Abrir selector').click();
  await page.getByLabel('28 de julio de').getByText('28').click();
  await page.locator('[id="__box7-arrow"]').click();
  await page.screenshot({path:'screenshots/colaborador5.png', fullPage:false})
  stepsLog.push({description: 'Se seleccionan la fecha de aplicacion', image:'screenshots/colaborador5.png'});
  await page.getByText('PM PROYECTOS SUCCESSFACTORS (').click();
  await page.locator('//*[@id="__field0-inner"]').click();
  await page.locator('//*[@id="__field0-inner"]').fill("10");
  await page.screenshot({path:'screenshots/colaborador6.png', fullPage:false})
  stepsLog.push({description: 'Se cambia el monto de suelto', image:'screenshots/colaborador6.png'});
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.screenshot({path:'screenshots/colaborador7.png', fullPage:false})
  stepsLog.push({description: 'Se guardan cambios', image:'screenshots/colaborador7.png'});
  await page.getByRole('button', { name: 'Enviar' }).click();
  
  await page.getByRole('button', { name: 'Navegación de cuenta para' }).click();
  await page.getByText('Cerrar sesión').click();
  await page.waitForTimeout(3000);

 await context.close()
 await browser.close();

  fs.writeFileSync("test-steps.json", JSON.stringify(stepsLog,null,2));
  
});
