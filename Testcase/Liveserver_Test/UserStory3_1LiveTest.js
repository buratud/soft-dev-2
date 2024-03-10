const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const delay = ms => new Promise(res => setTimeout(res, ms));
const path = require('path');
var assert = require('assert');
const firefoxOptions = new firefox.Options().setBinary('path/to/firefox');

// Create a new instance of the Firefox driver
const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOptions)
  .build();

  (async function User_can_view_other_blog() {
    try {
      await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/');
      //await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
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
      await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Blogs"]')).click();
      await delay(1000);
      console.log('Wait for drop bar to appear');
      await driver.findElement(By.xpath('//span[text()="All Blogs"]')).click();
      console.log('Go to blog page');
      await delay(2000);

      await driver.findElement(By.xpath('/html/body/div/div/div[1]/div[2]/div/a[1]')).click();
      await delay(2000);

      await driver.findElement(By.className('middle')).findElement(By.xpath('//div[text()="Blogs"]')).click();
      await delay(1000);
      console.log('Wait for drop bar to appear');
      await driver.findElement(By.xpath('//span[text()="All Blogs"]')).click();
      await delay(2000);

      await driver.findElement(By.xpath('/html/body/div/div/div[1]/div[2]/div/a[3]')).click();

      await driver.findElement(By.className('middle')).findElement(By.xpath('//div[text()="Blogs"]')).click();
      await delay(1000);
      console.log('Wait for drop bar to appear');
      await driver.findElement(By.xpath('//span[text()="All Blogs"]')).click();
      await delay(2000);

      await driver.findElement(By.xpath('/html/body/div/div/div[1]/div[2]/div/a[5]')).click();
      await delay(3000);


    } finally {
      // Close the browser
      await driver.quit();
    }
  })();