import { expect,chromium } from '@playwright/test';
import { test } from './hooks';
import fs from 'fs'
test.use({headless:false,
 
  });
const stepsLog=[];
test('testPOC', async () => {
  const testName='ATC-UAT-0010-Modificación de Puesto'
  const testDescription="Objetivo:Hacer el cambio de información del puesto de un empleado"
  const tester="Osvaldo Perez"
  const testMetadata = {
    name: testName,
    description: testDescription,
    tester: tester,
  };
  
  fs.writeFileSync('test-info.json', JSON.stringify(testMetadata, null, 2));

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

test('casoPrueba2', async () => {
  const browser = await chromium.launch({ headless: false }); // mejor ver lo que pasa
  const testName='ATC-UAT-020-Alta_de_Empleado'
  const testDescription=" Objetivo:Realizar el alta de un nuevo empleado"
  const tester="Osvaldo Perez"
  const testMetadata = {
    name: testName,
    description: testDescription,
    tester: tester,
  };
  fs.writeFileSync('test-info.json', JSON.stringify(testMetadata, null, 2));

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
  stepsLog.push({description: 'Se ingresa de manera correcta a plataforma', image:'screenshots/loginSucces.png'});
  await page.getByRole('textbox', { name: 'Los resultados de la búsqueda' }).click();
  await page.getByRole('textbox', { name: 'Los resultados de la búsqueda' }).fill('Agregar nuevo empleado');
  await page.screenshot({path:'screenshots/alta.png', fullPage:false})
  stepsLog.push({description: 'Se busca la opcion de agregar nuevo empleado', image:'screenshots/alta.png'})
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Los resultados de la búsqueda' }).press('Enter');
  await page.waitForTimeout(1000);
  const entidad = page.locator('[id="__box0-arrow"]')
  await expect(entidad).toBeVisible({ timeout: 10000 });
  await entidad.click();
  await page.screenshot({path:'screenshots/alta1.png', fullPage:false})
  stepsLog.push({description: 'Se visualiza los datos de contratación', image:'screenshots/alta1.png'})
  await page.getByText('I-GROW CONSULTING (1000)').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="__box1-arrow"]').click();
  await page.getByText('CONTRATACIÓN INICIAL (Hire01)').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="__box2-arrow"]').click();
  await page.getByText('Plantilla estándar').click();
  await page.screenshot({path:'screenshots/alta2.png', fullPage:false})
  stepsLog.push({description: 'Se introducen todos los campos de tipo de contratacion', image:'screenshots/alta2.png'})
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('textbox', { name: 'Nombre(s)' }).click();
  await page.getByRole('textbox', { name: 'Nombre(s)' }).fill('Osvaldo');
  await page.getByRole('textbox', { name: 'Primer Apellido' }).click();
  await page.getByRole('textbox', { name: 'Primer Apellido' }).click();
  await page.getByRole('textbox', { name: 'Primer Apellido' }).fill('Ceballos');
  await page.screenshot({path:'screenshots/alta3.png', fullPage:false})
  stepsLog.push({description: 'Se ingresa de forma correcta el nombre y apellido', image:'screenshots/alta3.png'})
  await page.getByRole('form', { name: 'Información biográfica' }).getByLabel('Abrir selector').click();
  await page.getByRole('textbox', { name: 'Fecha de Nacimiento' }).click();
  await page.getByRole('textbox', { name: 'Fecha de Nacimiento' }).fill('1997-09-26');
  await page.getByRole('form', { name: 'Información biográfica' }).getByLabel('Seleccionar opciones').click();
  await page.getByRole('option', { name: 'Mexico' }).locator('div').nth(2).click();
  await page.getByRole('textbox', { name: 'Entidad Federativa de' }).click();
  await page.getByRole('textbox', { name: 'Entidad Federativa de' }).fill('CDMX');
  await page.screenshot({path:'screenshots/alta4.png', fullPage:false})
  stepsLog.push({description: 'Se ingresa de manera correcta fecha de nacimiento, entidad federativa', image:'screenshots/alta4.png'})
  await page.getByRole('textbox', { name: 'ID Personal' }).click();
  await page.getByRole('textbox', { name: 'ID Personal' }).click();
  await page.getByRole('textbox', { name: 'ID Personal' }).fill('207');
  await page.getByRole('textbox', { name: 'Nombre de Usuario' }).click();
  await page.getByRole('textbox', { name: 'Nombre de Usuario' }).fill('OsvaCeballos');
  await page.screenshot({path:'screenshots/alta5.png', fullPage:false})
  stepsLog.push({description: 'Se ingresa de manera correcta el id del personal y el nombre de usuario', image:'screenshots/alta5.png'})
  await page.getByRole('button', { name: 'Eliminar Información sobre el' }).click();
  await page.screenshot({path:'screenshots/alta6.png', fullPage:false})
  stepsLog.push({description: 'Se elimina la informacion del', image:'screenshots/alta6.png'})
  await page.getByRole('button', { name: 'Continuar' }).click();


  await page.getByRole('textbox', { name: 'Nombre Preferido' }).click();
  await page.getByRole('textbox', { name: 'Nombre Preferido' }).fill('Osva');
  await page.locator('[id="__box9-arrow"]').click();
  await page.locator('[id="__box9-arrow"]').click();
  await page.getByText('HOMBRE').click();
  await page.locator('[id="__box10-arrow"]').click();
  await page.getByText('SOLTERO/A').click();await page.getByRole('combobox', { name: 'Nacionalidad' }).click();
  await page.getByRole('combobox', { name: 'Nacionalidad' }).fill('Mexico');
  await page.getByLabel('Se requiere "Nacionalidad"').getByText('Mexico').click();
  await page.screenshot({path:'screenshots/alta7.png', fullPage:false})
  stepsLog.push({description: 'Se ingresa de manera correcta el nombre preferido, nacionalidad, sexo', image:'screenshots/alta7.png'})
  const correo=  await page.getByRole('textbox', { name: 'Dirección de Correo Electró' })
  await correo.fill('');
  await correo.fill('osvaceba@dxgrow.com');
  await page.getByRole('button', { name: 'Información sobre el correo electrónico Agregar' }).click();
  await page.locator('[id="__box22-arrow"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('option', { name: 'PERSONAL' }).locator('div').nth(2).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'Tipo de Correo Electrónico Dirección de Correo Electrónico Es Principal Eliminar Información sobre el correo electrónico 2', exact: true }).getByLabel('Dirección de Correo Electró').click();
  await page.getByRole('row', { name: 'Tipo de Correo Electrónico Dirección de Correo Electrónico Es Principal Eliminar Información sobre el correo electrónico 2', exact: true }).getByLabel('Dirección de Correo Electró').fill('osvamex@hotmail.com');
  await page.screenshot({path:'screenshots/alta8.png', fullPage:false})
  stepsLog.push({description: 'Se agregan los correos electronicos', image:'screenshots/alta8.png'})
  await page.locator('[id="__box23-arrow"]').click();
  await page.getByRole('option', { name: 'No' }).locator('div').nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Número de Teléfono' }).click();
  await page.getByRole('textbox', { name: 'Número de Teléfono' }).fill('83221545');
  await page.getByRole('textbox', { name: 'Calle y Número Exterior' }).click();
  await page.getByRole('textbox', { name: 'Calle y Número Exterior' }).fill('calle 8');
  await page.getByRole('textbox', { name: 'Número Interior' }).click();
  await page.getByRole('textbox', { name: 'Número Interior' }).fill('22');
  await page.getByRole('textbox', { name: 'Colonia' }).click();
  await page.getByRole('textbox', { name: 'Colonia' }).fill('Progreso Nacional');
  await page.getByRole('combobox', { name: 'Estado', exact: true }).fill('CIUD');
  await page.waitForTimeout(3000);
  await page.getByLabel('Se requiere "Estado"').getByText('CIUDAD DE MÉXICO').click();
  await page.getByRole('combobox', { name: 'Delegación / Municipio' }).click();
  await page.getByRole('combobox', { name: 'Delegación / Municipio' }).fill('Gustav');
  await page.waitForTimeout(3000);
  await page.getByText('GUSTAVO A. MADERO').click();
  await page.getByRole('textbox', { name: 'Ciudad' }).click();
  await page.getByRole('textbox', { name: 'Ciudad' }).fill('CDMX');
  await page.getByRole('textbox', { name: 'Código postal' }).click();
  await page.getByRole('textbox', { name: 'Código postal' }).fill('3453');
  await page.locator('[id="__box17-arrow"]').click();
  await page.getByText('SÍ', { exact: true }).click();
  await page.screenshot({path:'screenshots/alta9.png', fullPage:false})
  stepsLog.push({description: 'Se agregan los datos demograficos del colaborador', image:'screenshots/alta9.png'})


  await page.getByRole('button', { name: 'Agregar Contacto de Emergencia' }).click();
  await page.getByRole('textbox', { name: 'Nombre', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nombre', exact: true }).fill('RITA');
  await page.locator('[id="__box26-arrow"]').click();
  await page.locator('[id="__box26-arrow"]').click();
  await page.waitForTimeout(1000);
  await page.getByLabel('Se requiere "Relación"').getByText('PADRES').click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Teléfono Celular' }).click();
  await page.getByRole('textbox', { name: 'Teléfono Celular' }).fill('557634584563');
  await page.locator('[id="__box27-arrow"]').click();
  await page.getByRole('option', { name: 'Sí' }).locator('div').nth(2).click();
  await page.locator('[id="__box28-arrow"]').click();
  await page.getByRole('option', { name: 'Sí' }).locator('div').nth(2).click();
  await page.locator('[id="__box29-arrow"]').click();
  await page.getByRole('option', { name: 'Sí' }).locator('div').nth(2).click();
  await page.waitForTimeout(1000);
  await page.screenshot({path:'screenshots/alta10.png', fullPage:false})
  stepsLog.push({description: 'Se agrega de manera correcta el contacto de emergencia', image:'screenshots/alta10.png'})
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('combobox', { name: 'Posición' }).click();
  await page.getByRole('combobox', { name: 'Posición' }).fill('Consultor');
  await page.waitForTimeout(1000);
  await page.getByRole('option', { name: 'CONSULTOR JR DE SOPORTE DE TALENTO (50000079)' }).click();
  await page.waitForTimeout(2000);
  await page.locator('[id="__box45-arrow"]').click();
  await page.getByText('Dias Festivos Mex (Dias').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="__schedule0-arrow"]').click();
  await page.waitForTimeout(1000);
  await page.getByText('DXGROW_MEX (DXGROW_MEX)').click();
  await page.waitForTimeout(2000);
  await page.locator('[id="__box46-arrow"]').click();
  await page.getByText('iGRW_Colaborador_General (').click();
  await page.locator('[id="__button78"]').click();
  await page.locator('[id="__button80"]').click();
  await page.waitForTimeout(1000);
  await page.screenshot({path:'screenshots/alta11.png', fullPage:false})
  stepsLog.push({description: 'Se agrega el puesto a ocupar <Posicion>', image:'screenshots/alta11.png'})
  await page.getByRole('button', { name: 'Eliminar Información sobre el' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('textbox', { name: 'Sueldo Mensual' }).click();
  await page.getByRole('textbox', { name: 'Sueldo Mensual' }).fill('1');
  await page.screenshot({path:'screenshots/alta12.png', fullPage:false})
  stepsLog.push({description: 'Se asigna un sueldo mensual', image:'screenshots/alta12.png'})
  await page.getByRole('button', { name: 'Enviar' }).click();
  //await page.pause();




 

  

  
  
  await page.waitForTimeout(10000);
  await page.screenshot({path:'screenshots/alta13.png', fullPage:false})
  stepsLog.push({description: 'Se dio de alta el colaborador correctamente', image:'screenshots/alta13.png'})
  await page.waitForTimeout(3000);

 await context.close()
 await browser.close();

  fs.writeFileSync("test-steps.json", JSON.stringify(stepsLog,null,2));
  
});


 

test('testPrueba', async () => {
  try{
  const testName='Cambio de sueldo'
  const testDescription=" Validar que entra al organigrama y dentro del perfil del colaborador cambiar el monto de su sueldo"
  const tester="Osvaldo Perez"
  const testMetadata = {
    name: testName,
    description: testDescription,
    tester: tester,
  };
  
  fs.writeFileSync('test-info.json', JSON.stringify(testMetadata, null, 2));

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
  await page.locator('//*[@id="j_passw"]').fill("PeIs1105+", { timeout: 5000 }); 
}catch (error){
  console.log("Error en la ejecución del test",error.message)
  throw error;
}
});