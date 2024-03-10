const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const delay = ms => new Promise(res => setTimeout(res, ms));
const path = require('path');
var assert = require('assert');

// Set the path to the Firefox executable 
const firefoxOptions = new firefox.Options().setBinary('path/to/firefox');

// Create a new instance of the Firefox driver
const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOptions)
  .build();

// Navigate to web DekHor
(async function User_can_access_market_and_add_product() {
  try {
    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
    await delay(3000);
    console.log('Successfully opened Dekhor in Firefox.');
    // Wait until the title of the page becomes "home"  
    await driver.wait(until.titleIs('Create Next App'), 3000);
    await driver.findElement(By.className('nav_login_btn__jYgLf')).click();
    await delay(3000);
    console.log('Click login button.');

    await driver.findElement(By.name('username')).sendKeys('stepoftz@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('123456');
    await driver.findElement(By.tagName('button')).click();
    console.log('Fill in login info and click login.');
    await delay(3000);

    await driver.wait(until.titleIs('Create Next App'), 3000);
    console.log('Wait for login and redirect to home page');
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Markets"]')).click();
    //await driver.wait(until.elementIsVisible('nav_dropdownContent__FrZ4s'), 3000); 
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="Main"]')).click();
    console.log('Click main Market in Navbar');
    await delay(1000);

    await driver.wait(until.titleIs('MarketConnect'), 3000);
    console.log('Successfully redirected to Markets.');

    await driver.findElement(By.className('middle')).findElement(By.xpath('//div[text()="Markets"]')).click();
    await delay(1000);
    await driver.findElement(By.xpath('//span[text()="Manage Product"]')).click();
    await delay(1000);
    await driver.findElement(By.className('add-product')).click();
    await delay(1000);
    //await driver.findElement(By.className('form-box-right')).findElement(By.xpath('//label[text()="Food Name"]')).findElement(By.tagName('input')).sendKeys('EWGF');
    await driver.findElement(By.className('form-box-right')).findElement(By.xpath('/html/body/div/div/form/div[1]/div[2]/input[1]')).sendKeys('Tod mun kung');
    await driver.findElement(By.className('form-box-right')).findElement(By.xpath('/html/body/div/div/form/div[1]/div[2]/input[2]')).sendKeys('666');
    await driver.findElement(By.className('form-box-right')).findElement(By.id('category')).findElement(By.xpath('//option[text()="Thai-Food"]')).click();
    await driver.findElement(By.className('form-box-right')).findElement(By.xpath('/html/body/div/div/form/div[1]/div[2]/input[3]')).sendKeys('LineID');
    await driver.findElement(By.className('description')).findElement(By.className('center-textarea')).sendKeys("I'm not gonna sugarcoat it.");

    //const filePath = path.join(__dirname, '/home/stz/Desktop/soft-dev-2/Testcase/Liveserver_Test/EWGF.jpeg');
    const filePath = path.join(__dirname, 'Blog2.jpeg');
    //let fileInput = await driver.findElement(By.className('form-box-left')).findElement(By.className('upload-button'));
    let fileInput = await driver.findElement(By.className('form-box-left')).findElement(By.css('input[type="file"]'));
    await fileInput.sendKeys(filePath);

    //await driver.findElement(By.className('form-box-left')).findElement(By.className('upload-button')).click(); 
    await delay(3000);

    await driver.findElement(By.className('send-button')).click();

    await delay(3000);

    await driver.switchTo().alert().accept();
    console.log('Close alert');

    await delay(3000);
    //await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop/markets/manage');

    //await delay(3000);

  } finally {
    // Close the browser
    await driver.quit();
  }
})();