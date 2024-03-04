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

// Navigate to web
(async function example() {
  try {
    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');

    // Wait until the title of the page becomes "home"
    await driver.wait(until.titleIs('Create Next App'), 3000);

    let attributeValue = await driver.findElement(By.className('nav_leftside__KJoZ9')).findElement(By.tagName('a')).getAttribute('href');
    //.getAttribute('href');
    //let attributeValue = await driver.findElement(By.className('nav_btn__oq_Li')).getAttribute('href');
    console.log(attributeValue);
    let attributeSignup = await driver.findElement(By.className('nav_btn__oq_Li')).findElement(By.tagName('a')).getAttribute('href');
    console.log(attributeSignup);

    console.log('Successfully opened Dekhor in Firefox.');
    await delay(3000);
  } finally {
    // Close the browser
    await driver.quit();
  }
})();