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
    await delay(3000);
    console.log('Successfully opened Dekhor in Firefox.');
    // Wait until the title of the page becomes "home"  
    await driver.wait(until.titleIs('Create Next App'), 3000);
    await driver.findElement(By.className('nav_btn__oq_Li')).click();
    console.log('User click singup');


    //await driver.wait(until.titleIs('DekHor | Login or Signup'), 5000);
    //await driver.wait(until.titleIs('Create Next App'), 5000);
    await delay(5000);
    //await driver.findElement(By.tagName('a')).click();

    //await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop/register');
    await driver.wait(until.titleIs('Create Next App'), 3000);
    console.log('Successfully opened Dekhor register page.');
    // Can't use duplicate email/user have to change every time.
    await driver.findElement(By.name('username')).sendKeys('YourUsername5');
    await driver.findElement(By.name('email')).sendKeys('you5@example.com');
    await driver.findElement(By.name('password')).sendKeys('YourPassword');
    await driver.findElement(By.name('reenterPassword')).sendKeys('YourPassword');
    console.log('Fill in register info.');

    await delay(5000);

    await driver.findElement(By.tagName('button')).click();

    console.log('Click register button.');
    await delay(5000);

    await driver.wait(until.titleIs('Create Next App'), 3000);
    console.log('User arrive at verify page')
    await driver.findElement(By.id('input1')).sendKeys('1');
    await driver.findElement(By.id('input2')).sendKeys('1');
    await driver.findElement(By.id('input3')).sendKeys('1');
    await driver.findElement(By.id('input4')).sendKeys('1');
    await driver.findElement(By.id('input5')).sendKeys('1');
    await driver.findElement(By.id('input6')).sendKeys('1');

    //await driver.findElement(By.tagName('button')).click();
    //console.log('User fill in otp and summit')
    await delay(5000);

    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
    console.log('Hop back to home page')
    await delay(3000);
    console.log('Successfully opened Dekhor in Firefox.');
    await driver.findElement(By.className('nav_login_btn__jYgLf')).click();
    await delay(3000);
    console.log('Click login button.');
    await driver.findElement(By.name('username')).sendKeys('stepoftz@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('123456');
    await driver.findElement(By.tagName('button')).click();
    console.log('Fill in login info and click login.');
    await delay(5000);



  } finally {
    // Close the browser
    await driver.quit();
  }
})();