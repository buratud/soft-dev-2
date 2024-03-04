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
(async function User_can_access_to_product_in_profile_and_edit() {
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
    await driver.findElement(By.className('nav_dropdownContentProfile__KfzNB')).findElement(By.xpath('//span[text()="My Profile"]')).click();
    console.log('Go to profile page');
    await delay(2000);
    await driver.findElement(By.className('page_dropdown__ldksV')).click();
    await delay(1000);
    console.log('Click drop down and market');
    await driver.findElement(By.xpath('//option[text()="DekHor Markets"]')).click();
    await delay(2000);
    await driver.findElement(By.xpath('/html/body/div/div[1]/div[3]/div/div/a')).click();
    console.log('Click manage product');
    await delay(2000);
    await driver.findElement(By.xpath('/html/body/div/div/div[2]/table/tbody/tr/td[1]/form/div[2]/a')).click();
    console.log('Click edit product');
    await delay(2000);
    console.log('clear and edit product');
    await driver.findElement(By.className('form-box-right')).findElement(By.xpath('/html/body/div/div/form/div[1]/div[2]/input[1]')).clear();
    await driver.findElement(By.className('form-box-right')).findElement(By.xpath('/html/body/div/div/form/div[1]/div[2]/input[1]')).sendKeys('EWHF');
    await driver.findElement(By.className('form-box-right')).findElement(By.xpath('/html/body/div/div/form/div[1]/div[2]/input[2]')).clear();
    await driver.findElement(By.className('form-box-right')).findElement(By.xpath('/html/body/div/div/form/div[1]/div[2]/input[2]')).sendKeys('777');
    await driver.findElement(By.className('form-box-right')).findElement(By.id('category')).findElement(By.xpath('//option[text()="Drinks"]')).click();
    await driver.findElement(By.className('form-box-right')).findElement(By.xpath('/html/body/div/div/form/div[1]/div[2]/input[3]')).clear();
    await driver.findElement(By.className('form-box-right')).findElement(By.xpath('/html/body/div/div/form/div[1]/div[2]/input[3]')).sendKeys('LineXD');
    await driver.findElement(By.className('description')).findElement(By.className('center-textarea')).clear();
    await driver.findElement(By.className('description')).findElement(By.className('center-textarea')).sendKeys("I'm not gonna heat sugarcoat it.");

    const filePath = path.join(__dirname, 'EWHF.jpeg');
    //let fileInput = await driver.findElement(By.className('form-box-left')).findElement(By.className('upload-button'));
    let fileInput = await driver.findElement(By.className('form-box-left')).findElement(By.css('input[type="file"]'));
    await fileInput.sendKeys(filePath);

    //await driver.findElement(By.className('form-box-left')).findElement(By.className('upload-button')).click(); 
    await delay(3000);

    await driver.findElement(By.className('send-button')).click();
    console.log('Done edit product');
    await delay(3000);

    await driver.switchTo().alert().accept();
    console.log('Close alert');

    await delay(3000);





    } finally {
      // Close the browser
      await driver.quit();
    }
  })();