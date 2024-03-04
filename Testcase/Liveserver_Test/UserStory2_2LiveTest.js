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
(async function User_can_search_in_market() {
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
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Markets"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="All Products"]')).click();
    console.log('Go to market product page');
    await delay(2000);
    await driver.findElement(By.className('textbox_container')).findElement(By.tagName('input')).sendKeys('EW');
    await delay(2000);
    console.log('Wait for search result');
    let searched = await driver.findElement(By.className('search_result_item_title')).findElement(By.xpath('//div[contains(text(), "EW")]'));
    console.log('Show search result');
    console.log(await searched.getText());
    await delay(500);
    searched.click();
    await delay(2000);
    let searchresult = await driver.findElement(By.css('h2'));
    let h2text = await searchresult.getText();
    
    assert.strictEqual(h2text, 'EWGF', 'The H2 text does not match the expected text.');

    console.log('Test passed: The H2 text matches the expected text.');
} catch (error) {
    console.error('Test failed:', error);


    } finally {
      // Close the browser
      await driver.quit();
    }
  })();