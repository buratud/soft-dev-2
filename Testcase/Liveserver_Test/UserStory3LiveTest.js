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

  (async function User_can_write_blog() {
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
      await driver.findElement(By.className('page_portal__H6OVg')).findElement(By.xpath('//p[text()="DekHor Blogs"]')).click();
      console.log('Go to blog main page');
      await delay(2000);
      await driver.findElement(By.className('middle')).findElement(By.xpath('//div[text()="Blogs"]')).click();
      await delay(1000);
      console.log('Wait for drop bar to appear');
      await driver.findElement(By.xpath('//span[text()="Blogging"]')).click();
      await delay(2000);

      const filePath = path.join(__dirname, 'Blog1.jpeg');
      let fileInput = await driver.findElement(By.xpath('/html/body/div[1]/div/div[1]/div/div/div/form/div[1]')).findElement(By.css('input[type="file"]'));
      await fileInput.sendKeys(filePath);
      console.log('Insert pic');
      await delay(1000);
      await driver.findElement(By.className('title__head')).findElement(By.tagName('input')).sendKeys('Khao Khitchakut');
      await driver.findElement(By.className('Catagory')).findElement(By.id('Category')).findElement(By.xpath('//option[text()="story"]')).click();
      await driver.findElement(By.className('jodit-wysiwyg')).sendKeys('How to destroy you ankle as buddish');

      await delay(1000);
      //await driver.findElement(By.tagName('button')).findElement(By.xpath('/html/body/div[1]/div/div[1]/div/div/div/form/div[5]/button')).location
      //await driver.findElement(By.className('Post-btn btn btn-secondary')).click();
      let button = await driver.findElement(By.xpath('/html/body/div[1]/div/div[1]/div/div/div/form/div[5]/button'));
      await delay(1000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", button);
      await driver.wait(until.elementIsEnabled(button), 5000); // Wait up to 5 seconds
      await delay(1000);
      await button.click();
      console.log('Done add blog');
      await delay(1000);

      await driver.switchTo().alert().accept();
      console.log('Close alert');
  
      await delay(3000);


    } finally {
      // Close the browser
      await driver.quit();
    }
  })();
     

   