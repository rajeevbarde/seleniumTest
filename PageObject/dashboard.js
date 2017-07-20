class Dashboard
{    
    constructor(webDriver)
    {                  
        this.currentDriver = webDriver.driver;
        this.By = webDriver.By;       
        this.until = webDriver.until;     
        let time = new Date().getTime().toString();   
        this.PageName = 'test'+time;
    }

    CreateNewPage()
    {
        try
        {
            //Click on '+'
            let locCreatePage = '//*[@id="confluence-ui"]/div/div[1]/div[1]/div[1]/div[1]/div[1]/div/div[1]/div/div[1]/div/div[2]/button[2]/div';
            let createPage = this.currentDriver.wait(this.until.elementLocated(this.By.xpath(locCreatePage)),100000);
            this.currentDriver.wait(this.until.elementIsVisible(createPage),10000);
            createPage.click();
            
            
            //verify blank page exist
            let blankPage = this.currentDriver.wait(this.until.elementLocated(this.By.className('template-preview icon-blank-page-large')),100000);
            this.currentDriver.wait(this.until.elementIsVisible(blankPage),50000);

            //click on create button
            let locCreateDialog = '//*[@id="create-dialog"]/div/div[2]/button';                
            let  createDialog = this.currentDriver.wait(this.until.elementLocated(this.By.xpath(locCreateDialog)),100000);
            this.currentDriver.wait(this.until.elementIsVisible(createDialog),50000);
            createDialog.click();
            
            // add Page title
            let locPageTitle = 'content-title';        
            let pageTitle = this.currentDriver.wait(this.until.elementLocated(this.By.id(locPageTitle),100000));
            this.currentDriver.wait(this.until.elementIsVisible(pageTitle),100000);
            pageTitle.sendKeys(this.PageName);        

            //publish page
            let locPublish = 'rte-button-publish';        
            let publish = this.currentDriver.wait(this.until.elementLocated(this.By.id(locPublish)),100000); 
            this.currentDriver.wait(this.until.elementIsVisible(publish),100000);
            publish.click();
            this.currentDriver.sleep(10000);
        }
        catch(e)
        {
            console.log("exception : "+ e.message);
        }        
    }

    ChangeRestriction()
    {
        try
        {                
            //Click on menu
            let locActionMenu = 'action-menu-link';
            let actionMenu =  this.currentDriver.wait(this.until.elementLocated(this.By.id(locActionMenu)),100000);
            this.currentDriver.wait(this.until.elementIsVisible(actionMenu),100000);
            actionMenu.click();

            //click permission menu
            let locPermissionMenu = 'action-page-permissions-link';
            let permissionMenu =  this.currentDriver.wait(this.until.elementLocated(this.By.id(locPermissionMenu)),100000);
            this.currentDriver.wait(this.until.elementIsVisible(permissionMenu),100000);
            permissionMenu.click();

            //check for restriction dialog
            let locRestrictionDialog = 'update-page-restrictions-dialog';
            let restrictionDialog = this.currentDriver.wait(this.until.elementLocated(this.By.id(locRestrictionDialog)),100000); 
            this.currentDriver.wait(this.until.elementIsVisible(restrictionDialog),100000);                 

            this.currentDriver.sleep(10000);

            //click on dropDown button 
            let locDD = 's2id_page-restrictions-dialog-selector';
            let DD = this.currentDriver.wait(this.until.elementLocated(this.By.id(locDD)),100000); 
            this.currentDriver.wait(this.until.elementIsVisible(DD),10000);         
            DD.click();        

            //select - 'Viewing and editing restricted'
            let locDDSelection = '//*[@id="select2-drop"]/ul/li[3]';
            this.currentDriver.findElement(this.By.xpath(locDDSelection)).click();
            
            //click Save
            let locSave = 'page-restrictions-dialog-save-button';
            this.currentDriver.findElement(this.By.id(locSave)).click();
        }
        
        catch(e)
        {
            console.log("exception : "+ e.message);
        }
    }

    
}
module.exports = Dashboard;