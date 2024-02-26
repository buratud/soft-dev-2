const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const delay = ms => new Promise(res => setTimeout(res, ms));
var assert = require('assert');

// Set the path to the Firefox executable 
const firefoxOptions = new firefox.Options().setBinary('path/to/firefox');

// Create a new instance of the Firefox driver
const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOptions)
  .build();

// Navigate to web DekHor
(async function User_can_open_web_site_and_register() {
  try {
    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
    await delay(3000);
    console.log('Successfully opened Dekhor in Firefox.');
    // Wait until the title of the page becomes "home"  
    await driver.wait(until.titleIs('Create Next App'), 3000);
    await driver.findElement(By.className('nav_login_btn__jYgLf')).click();
    await delay(3000);
    console.log('Click login button.');
    //await driver.findElement(By.name('username')).sendKeys('thitirutrost@hotmail.com');
    //await driver.findElement(By.name('username')).sendKeys('1111');
    //await driver.findElement(By.name('password')).sendKeys('2572454');
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
    await delay(3000);


  } finally {
    // Close the browser
    await driver.quit();
  }
})();