//Import required modules
var SeleniumWebDriver = require('./SeleniumDriver/webdriver.js'); 
var Login = require('./PageObject/Login.js'); 
var Dashboard = require('./PageObject/dashboard.js'); 
var test = require('selenium-webdriver/testing'); //test
var log = require('selenium-webdriver/lib/logging'); //test
var chai = require('chai');
var appConfig = require('./appConfig.json');

//Initialize global driver to be used by all pages
var globalDriver = new SeleniumWebDriver(appConfig.browser.toString());     
var l1 = new Login(globalDriver); 
var d1 = new Dashboard(globalDriver);    

//MOCHA - Before all tests 
test.before(function(done) {                  
    l1.currentDriver.manage().window().maximize().then(() => done());    
});

//MOCHA - After all tests
test.after(function() {
    this.timeout(50000);
    driver.quit();
});

//MOCHA - 1.Create new Page
test.describe('1. Create a new page', function() {    
            
    test.it('a. Login to confluence', function(done) {        
        l1.OpenLoginPage();        
        l1.EnterUserNameSubmit();        
        l1.EnterPasswordSubmit();        
        done();
    });
    
    test.it('b. Create new page', function(done) {        
        d1.CreateNewPage();        
        done();
    });
    
    test.it('c. Verify page is created', function(done) {                                           
        d1.currentDriver.navigate().refresh();
        d1.currentDriver.sleep(10000);
        
        let locTextTitle = 'title-text';  
        let textTitle = d1.currentDriver.wait(d1.until.elementLocated(d1.By.id(locTextTitle),10000));
        
        d1.currentDriver.wait(d1.until.elementIsVisible(textTitle),10000).getText()
            .then(function(x)
            {
                chai.expect(x).to.be.equal(d1.PageName);             
            });
        done();
    });//it.c.
});

//MOCHA - 2.Set restrictions on an existing page
test.describe('2. Set restrictions on an existing page', function() {  
        
    test.it('a. change restrictions', function(done) {
        d1.ChangeRestriction();
        done();
    });


    test.it('b. verify restrictions', function(done) {        
        //click on restriction
        let locRestrictionIcon = 'content-metadata-page-restrictions';
        let restrictionIcon =  d1.currentDriver.wait(d1.until.elementLocated(d1.By.id(locRestrictionIcon)),10000);
        d1.currentDriver.wait(d1.until.elementIsVisible(restrictionIcon),10000);   
        restrictionIcon.click();

        //Verify restriction
        let selectionText = 'Viewing and editing restricted';   
        let locSelectionText = '//*[@id="s2id_page-restrictions-dialog-selector"]/a/span[1]/div/span[2]';
        let selectedItem = d1.currentDriver.wait(d1.until.elementLocated(d1.By.id(locSelectionText),10000));
        d1.currentDriver.wait(d1.until.elementIsVisible(selectedItem),10000).getText()        
            .then(function(txt)
            {
                chai.expect(txt).to.be.equal(selectionText);                                                                   
            });

        //close dialog
        let locClose = 'page-restrictions-dialog-close-button';                       
        d1.currentDriver.findElement(d1.By.id(locClose)).click(); 
        done();
    });
});
