// This implement base on figma maynot operate with actual website.
const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const delay = ms => new Promise(res => setTimeout(res, ms));

// Set the path to the Firefox executable 
const firefoxOptions = new firefox.Options().setBinary('path/to/firefox');

// Create a new instance of the Firefox driver
const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOptions)
  .build();

// Navigate to web DekHor
(async function User_can_open_web_site_and_register() {
  try {
    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
    //await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop/register');
    console.log('Successfully opened Dekhor in Firefox.');
    // Wait until the title of the page becomes "home"  
    await driver.wait(until.titleIs('DekHor | Login or Signup'), 3000);
    await delay(5000);
    await driver.findElement(By.tagName('a')).click();
    console.log('User click singup');

    await driver.wait(until.titleIs('Create Next App'), 3000);
    console.log('Successfully opened Dekhor register page.');

    await driver.findElement(By.name('username')).sendKeys('YourUsername');
    await driver.findElement(By.name('email')).sendKeys('you@example.com');
    await driver.findElement(By.name('password')).sendKeys('YourPassword');
    await driver.findElement(By.name('reenterPassword')).sendKeys('YourPassword');
    console.log('Fill in register info.');

    await delay(5000);

    await driver.findElement(By.tagName('button')).click();

    console.log('Click register button.');
    await delay(5000);

  } finally {
    // Close the browser
    await driver.quit();
  }
})();