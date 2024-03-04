const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const delay = ms => new Promise(res => setTimeout(res, ms));
var assert = require('assert');
const firefoxOptions = new firefox.Options().setBinary('path/to/firefox');

// Create a new instance of the Firefox driver
const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOptions)
  .build();


// Navigate to the specified website
(async function User_can_access_to_all_portal_and_feature() {
  try {
    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
    await delay(3000);
    console.log('Successfully opened Dekhor in Firefox.');
    await driver.findElement(By.className('nav_login_btn__jYgLf')).click();
    await delay(3000);
    console.log('Click login button.');
    await driver.findElement(By.name('username')).sendKeys('stepoftz@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('123456');
    await driver.findElement(By.tagName('button')).click();
    console.log('Fill in login info and click login.');
    await delay(2000);
    await driver.findElement(By.className('nav_rightside__fuSzv')).click();
    await delay(1000);
    await driver.findElement(By.className('nav_dropdownContentProfile__KfzNB')).findElement(By.xpath('//span[text()="Support"]')).click();
    console.log('Go to Support page');
    await delay(2000);
    await driver.findElement(By.xpath('/html/body/div/div[1]/div[2]/div/div[3]/div/div[2]/div[1]/div[2]/input')).click();
    await driver.findElement(By.className('textbox-container')).findElement(By.xpath('/html/body/div/div[1]/div[2]/div/div[3]/div/div[3]/textarea')).sendKeys('Test send ticket with selenium');
    await delay(1000);
    await driver.findElement(By.xpath('/html/body/div/div[1]/div[2]/div/div[3]/div/button')).click();
    await delay(2000);


    } finally {
      // Close the browser
      await driver.quit();
    }
  })();