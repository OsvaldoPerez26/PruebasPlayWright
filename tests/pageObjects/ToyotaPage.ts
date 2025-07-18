import { Locator, Page, expect } from "@playwright/test";

export class ToyotaPage{

   // private readonly username: Locator
   // private readonly password: Locator
    private readonly loginButton : Locator
    private readonly inputModel : Locator
    
    constructor(page:Page){
        this.loginButton=page.locator('button[id=\'button-57210e227b\']')
        this.inputModel=page.locator('//*[@id="container-6fd65c196d"]/div/div/div[2]/div/section/div/input')
    }

    async fillModel(modeloText:string){
        await this.inputModel.fill(modeloText)
    }
    async clickButton(){
        await this.loginButton.click()
    }

    // async checkLog(){
    //     await expect(this.)
    // }

    //await page.locator('button[id=\'button-57210e227b\']').click()

  //await page.locator('//*[@id="container-6fd65c196d"]/div/div/div[2]/div/section/div/input').fill("Rav4")

}