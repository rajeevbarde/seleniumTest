var appConfig = require('../appConfig.json');

class Login
{    
    constructor(webDriver)
    {                    
        this.currentDriver = webDriver.driver;
        this.By = webDriver.By;       
        this.until = webDriver.until;       
        this.PageURL = appConfig.PageURL.toString();
    }

    OpenLoginPage()
    {
        try
        {
            this.currentDriver.get(this.PageURL);
        }
        catch(e)
        {
            console.log("exception : "+ e.message);
        }
        
    }

    EnterUserNameSubmit()
    {
        try
        {
            //enter username 
            let locUserName = 'username';   
            let username = this.currentDriver.wait(this.until.elementLocated(this.By.id(locUserName)),10000);
            username.sendKeys(appConfig.username.toString());               

            //click submit 
            let locSubmit = '//*[@id="login-submit"]';
            let login_submit = this.currentDriver.wait(this.until.elementLocated(this.By.xpath(locSubmit)),10000);
            login_submit.click();
        }
        catch(e)
        {
            console.log("exception : "+ e.message);
        }
    }

    EnterPasswordSubmit()
    {
        try
        {
            //enter password
            let locPass = 'password'; 
            let password = this.currentDriver.wait(this.until.elementLocated(this.By.id(locPass)),10000);
            this.currentDriver.wait(this.until.elementIsVisible(password),10000); 
            password.sendKeys(appConfig.password);
            
            //click submit
            let locSubmit = '//*[@id="login-submit"]';
            let login_submit = this.currentDriver.wait(this.until.elementLocated(this.By.xpath(locSubmit)),10000);        
            login_submit.click();
        }


        catch(e)
        {
            console.log("exception : "+ e.message);  
        }
    }
}

module.exports = Login;