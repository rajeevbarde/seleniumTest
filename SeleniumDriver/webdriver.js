const sel_WebDriver = require('selenium-webdriver');

class SeleniumWebDriver
{    
    constructor(browser)
    {        
        this.driver = null;        
        this.By  = sel_WebDriver.By;
        this.until  = sel_WebDriver.until;
        
        if(browser == 'chrome')
            this.driver = this.buildChromeDriver();
        
        if(browser == 'firefox')
            this.driver = this.buildFirefoxDriver();
        
    }

    buildChromeDriver()
    {
        let chrome = require('selenium-webdriver/chrome'); 
        let chromePath = 'C:\\projects\\altassian\\SeleniumDriver\\chromedriver.exe';   
        let service = new chrome.ServiceBuilder(chromePath).build();
        chrome.setDefaultService(service);

        let driver = new sel_WebDriver.Builder()
                .forBrowser('chrome')               
                .withCapabilities(sel_WebDriver.Capabilities.chrome())                
                .build();
                
        return driver;
    }

    buildFirefoxDriver()
    {
        let ff = require('selenium-webdriver/firefox');                      

        let driver = new sel_WebDriver.Builder()
        .forBrowser('firefox')                
        .build();    

        return driver;    
    }
}

module.exports = SeleniumWebDriver;