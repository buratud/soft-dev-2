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


// Navigate to the specified website
(async function User_can_write_blog_in_other_catagory() {
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

    await driver.findElement(By.className('nav_rightside__fuSzv')).click();
    await delay(1000);

    await driver.findElement(By.className('nav_dropdownContentProfile__KfzNB')).findElement(By.xpath('//span[text()="My Profile"]')).click();
    await delay(1000);

    await driver.findElement(By.className('page_dropdown__ldksV')).click();
    await delay(1000);
    console.log('Click drop down and blog');
    await driver.findElement(By.xpath('//option[text()="DekHor Blogs"]')).click();
    await delay(1000);
    await driver.findElement(By.xpath('/html/body/div/div[1]/div[3]/div/div/button[2]')).click();
    await delay(1000);
    await driver.findElement(By.xpath('//div[text()="Khao Khitchakut"]')).click();
    await delay(1000);
    await driver.findElement(By.xpath('/html/body/div/div/div[1]/div/div[1]/div[3]/div[2]/div/a')).click();
    await delay(1000);

    let textedit = await driver.findElement(By.className('jodit-workplace'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", textedit);
    await delay(1000);
    let textarea = await driver.findElement(By.className('jodit-wysiwyg'));
    await delay(1000);
    await textarea.clear();
    //let element = await driver.wait(until.elementLocated(By.css('.jodit-wysiwyg')), 10000);
    
    //await driver.wait(until.elementIsVisible(element), 10000).clear();
    //await driver.findElement(By.className('jodit-wysiwyg')).clear();
    //await driver.executeScript("arguments[0].value = 'Your text here';", element);
    await driver.findElement(By.className('jodit-wysiwyg')).sendKeys('Nirvana path for who have strange and cold resistance.');
    await delay(1000);
    await delay(1000);
    let button = await driver.findElement(By.xpath('/html/body/div[1]/div/div[1]/div/div/div/form/div[5]/button'));
    await delay(1000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", button);
    await driver.wait(until.elementIsEnabled(button), 5000); // Wait up to 5 seconds
    await delay(1000);
    await button.click();
    console.log('Done edit blog');
    await delay(1000);

    await driver.switchTo().alert().accept();
    console.log('Close alert');

    await delay(3000);








} finally {
    // Close the browser
    await driver.quit();
  }
})();