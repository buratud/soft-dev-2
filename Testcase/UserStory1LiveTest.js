// This implement base on figma maynot operate with actual website.
const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const delay = ms => new Promise(res => setTimeout(res, ms));
//const { sleep } = require('sleep');

// Set the path to the Firefox executable 
const firefoxOptions = new firefox.Options().setBinary('path/to/firefox');

// Create a new instance of the Firefox driver
const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOptions)
  .build();

// Navigate to web
(async function User_can_open_web_site_and_register() {
  try {
    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
    console.log('Successfully opened Dekhor in Firefox.');
    // Wait until the title of the page becomes "home"
    await driver.wait(until.titleIs('Create Next App'), 1000);
    await driver.findElement(By.name('username')).sendKeys('YourUsername');
    await driver.findElement(By.name('email')).sendKeys('you@example.com');
    await driver.findElement(By.name('password')).sendKeys('YourPassword');
    await driver.findElement(By.name('reenterPassword')).sendKeys('YourPassword');
    console.log('Fill in register info.');
    //sleep(5);
    await delay(5000);
    await driver.findElement(By.tagName('button')).click();
    console.log('Click register button.');
    //sleep(5);
    await delay(5000);
  } finally {
    // Close the browser
    await driver.quit();
  }
})();