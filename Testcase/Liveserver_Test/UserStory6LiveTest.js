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
(async function User_can_use_fillter_in_dorm() {
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
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Dorms"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="Main"]')).click();
    await delay(1000);
    await driver.findElement(By.className('style_button__BMJeP')).click();
    await delay(2000);
    const actions = driver.actions({bridge: true});
    const sliderHandle1 = await driver.findElement(By.css('span.MuiSlider-thumb:nth-child(14)'));
    const sliderHandle2 = await driver.findElement(By.css('span.MuiSlider-thumb:nth-child(15)'));
    await actions.dragAndDrop(sliderHandle1, {x: 40, y: 0}).perform();
    await delay(1000);
    console.log('Move left slide bar');
    await actions.dragAndDrop(sliderHandle2, {x: -20, y: 0}).perform();
    await delay(1000);
    console.log('Move rigth slide bar');
    await driver.findElement(By.xpath('/html/body/div[1]/div/div[2]/div[2]/div/label[1]/input')).click();
    console.log('click check box');
    await delay(1000);
    let linkLocator = By.xpath('/html/body/div[2]/div/div[1]/div/a');
    await driver.wait(until.elementLocated(linkLocator), 10000);
    await driver.executeScript("arguments[0].click();", driver.findElement(linkLocator));
    console.log('select dorm after filter');
    await delay(2000);
    await driver.findElement(By.className('reviewsbox')).findElement(By.xpath('//button[text()="Add A Review"]')).click();
    await delay(2000);
    console.log('click add rewiew');
    await driver.findElement(By.className('summaryreview')).findElement(By.tagName('textarea')).sendKeys('Test case');
    await driver.findElement(By.className('detailreview')).findElement(By.tagName('textarea')).sendKeys('Test review with selenium');
    await driver.findElement(By.className('stars')).findElement(By.xpath('/html/body/div/div[2]/div[2]/div[1]/div/span[5]')).click();
    await delay(1000);
    await driver.findElement(By.className('reviewButton')).click();
    await delay(3000);






    } finally {
      // Close the browser
      await driver.quit();
    }
  })();