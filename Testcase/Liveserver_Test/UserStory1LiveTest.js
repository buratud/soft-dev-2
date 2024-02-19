const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const delay = ms => new Promise(res => setTimeout(res, ms));
var assert = require('assert');

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
    //let myElement = await driver.findElement(By.id('main'));
    //let attributeValue = await myElement.getAttribute('href');
    let attributeValue = await driver.findElement(By.className('nav_leftside__KJoZ9')).findElement(By.tagName('a')).getAttribute('href');
    //.getAttribute('href');
    //let attributeValue = await driver.findElement(By.className('nav_btn__oq_Li')).getAttribute('href');
    console.log(attributeValue);
    let attributeSignup = await driver.findElement(By.className('nav_btn__oq_Li')).findElement(By.tagName('a')).getAttribute('href');
    console.log(attributeSignup);
    //assert.equal(attributeValue, 'https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop/register', 'The href attribute is not as expected.');
    //assert.equal(attributeValue, '/develop/register', 'The href attribute is not as expected.');
    await driver.findElement(By.className('nav_btn__oq_Li')).click();
    console.log('User click singup');


    //await driver.wait(until.titleIs('DekHor | Login or Signup'), 5000);
    await delay(5000);
    //await driver.findElement(By.tagName('a')).click();

    //await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop/register');
    await driver.wait(until.titleIs('DekHor | Register'), 3000);
    console.log('Successfully opened Dekhor register page.');
    // Can't use duplicate email/user have to change every time.
    await driver.findElement(By.name('username')).sendKeys('YourUsername6');
    await driver.findElement(By.name('email')).sendKeys('you6@example.com');
    await driver.findElement(By.name('password')).sendKeys('YourPassword');
    await driver.findElement(By.name('reenterPassword')).sendKeys('YourPassword');
    console.log('Fill in register info.');

    await delay(5000);
/*
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
*/
    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
    console.log('Hop back to home page')
    await delay(3000);
    console.log('Successfully opened Dekhor in Firefox.');
    await driver.findElement(By.className('nav_login_btn__jYgLf')).click();
    await delay(3000);
    console.log('Click login button.');
    await driver.findElement(By.name('username')).sendKeys('thitirutrost@hotmail.com');
    await driver.findElement(By.name('password')).sendKeys('2572454');
    await driver.findElement(By.tagName('button')).click();
    console.log('Fill in login info and click login.');
    await delay(5000);



  } finally {
    // Close the browser
    await driver.quit();
  }
})();