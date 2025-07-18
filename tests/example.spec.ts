import { test, expect } from '@playwright/test';
import { ToyotaPage } from './pageObjects/ToyotaPage';

test.use({headless:false});
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('test personal', async ({ page }) => {

  // await page.on("request", req=>{
  //   console.log(req.url());
  // }) 
    await page.route("**/*.{png,jpg,svg}", route=>route.abort())
   // await page.route("https://www.toyota.mx/content/dam/tmex/gazoo_logo1.jpg",route=> route.abort());


  /*await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();*/

  const ToyotaPage1 = new ToyotaPage(page)
  //await page.goto("https://www.toyota.mx/");
  const baseURL=process.env.URL
  console.log("esto ", baseURL)
  await page.goto(baseURL)
  //await page.pause();
  await page.waitForTimeout(5000); 
  await ToyotaPage1.clickButton()
  await ToyotaPage1.fillModel("Rav4")
  //await page.locator('button[id=\'button-57210e227b\']').click()
  await page.screenshot({path:'screenshots/login2.png', fullPage:true})
  //await page.locator('//*[@id="container-6fd65c196d"]/div/div/div[2]/div/section/div/input').fill("Rav4")
  await page.locator('//*[@id="container-6fd65c196d"]/div/div/div[2]/div/section/div/button').click()
  await expect(page.locator('//*[@id="container-db33540857"]/div/div/div/div[1]/div[1]/h2')).toHaveText('Hemos encontrado estos resultados para "Rav4"')
  await page.waitForTimeout(10000); 
  await page.locator('(//button[contains(@class,\'c22-search-results__search-card-content-button\')])[2]').click()


  ////button[contains(@class,'c22-search-results__search-card-content-button') and contains(text(),'Explorar Modelo')]
  // const arr=[1,2,3,4]

  // for (let i in arr){
  //   console.log(i)
  // }

  // arr.forEach((ele,index)=>{
  //   console.log(`${ele} : ${index}`);
  // })

  await page.waitForTimeout(5000); 


});

test('test Table', async ({page})=>{
  await page.goto("https://www.kia.com/mx/service/service-care/maintenance.html")
  await page.waitForTimeout(5000);

  const tablaContenedora=await page.locator("xpath=//*[@id='content']/div/div[2]/div/div/div[2]/div[1]/div[1]/div/table[1]")

  const rows =await tablaContenedora.locator("xpath=.//tr").all()

  console.log(rows.length)
  const models:km[]=[]
  for (let item of rows){
    let payment:km={
      primero:await item.locator('xpath=.//td[1]').innerText(),
      segundo:await item.locator('xpath=.//td[2]').innerText(),
      tercero:await item.locator('xpath=.//td[3]').innerText(),
    }
    models.push(payment)
  }

  for (let mod of models){
    console.log(mod)
  }

  const row1= rows.at(1);
  const firstPayment= await row1?.locator('xpath=.//td[3]').innerText()

  console.log(firstPayment)

 

  interface km{
    primero:string,
    segundo:string,
    tercero:string
  }



});


