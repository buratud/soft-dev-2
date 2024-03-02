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
    await driver.findElement(By.className('nav_middle__WGztn')).findElement(By.xpath('//div[text()="Blogs"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="Blogging"]')).click();
    await delay(2000);

    const filePath = path.join(__dirname, 'Blog2.jpeg');
    let fileInput = await driver.findElement(By.xpath('/html/body/div[1]/div/div[1]/div/div/div/form/div[1]')).findElement(By.css('input[type="file"]'));
    await fileInput.sendKeys(filePath);
    console.log('Insert pic');
    await delay(1000);
    await driver.findElement(By.className('title__head')).findElement(By.tagName('input')).sendKeys('Tod Mun Kung');
    await driver.findElement(By.className('Catagory')).findElement(By.id('Category')).findElement(By.xpath('//option[text()="cooking"]')).click();
    await driver.findElement(By.className('jodit-wysiwyg')).sendKeys('รากผักชี กระเทียม พริกไทยโขลก 1 ช้อนโต๊ กุ้งสับ 250 กรัม  หมูเด้ง 150 กรัมะ แป้งมัน 2-3 ช้อนโต๊ะ  ไข่ไก่ 1 ฟอง (ใช้เฉพาะไข่แดง)     น้ำตาลทราย 1 ช้อนชา   น้ำปลา 2 ช้อนชา  ซีอิ้วขาว 1 ช้อนโต๊ะ  น้ำมันพืช สำหรับการทอด  เกล็ดขนมปัง 2 ถ้วย  น้ำจิ้มบ๊วย     น้ำจิ้มอาจาด');

    await delay(1000);
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