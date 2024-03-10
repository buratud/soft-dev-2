const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const delay = ms => new Promise(res => setTimeout(res, ms));
const path = require('path');
var assert = require('assert');

// Set the path to the Firefox executable 
const firefoxOptions = new firefox.Options().setBinary('path/to/firefox');

// Create a new instance of the Firefox driver
const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOptions)
  .build();

// Navigate to web DekHor
(async function User_can_open_web_site_and_register_login_edit_profile() {
  try {
    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
    await delay(3000);
    console.log('Successfully opened Dekhor in Firefox.');
    // Wait for page to update header
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
    await delay(3000);
    //await driver.findElement(By.tagName('a')).click();

    //await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop/register'); 
    
    await driver.wait(until.titleIs('DekHor | Register'), 3000);
    console.log('Successfully opened Dekhor register page.');
    let register_form = await driver.findElement(By.className('register_register_form__7jFI0'));
    let getHead1 = await driver.findElement(By.css('head1'));
    let getHead2 = await driver.findElement(By.css('head2'));
    let h1text = await getHead1.getText();
    let h2text = await getHead2.getText();
    assert.equal(h1text,'Get Started with','The h1 text does not match the expected text.');
    assert.equal(h2text,'DekHor ID','The h2 text does not match the expected text.');
    console.log('Test passed: Head text matches the expected text.');
    
    let Intro_text = await driver.findElement(By.className('register_Intro_2__1he0S'));
    console.log(await Intro_text.getText());

    


    // Can't use duplicate email/user have to change every time.
    await driver.findElement(By.name('username')).sendKeys('YourUsername6');
    await driver.findElement(By.name('email')).sendKeys('you6@example.com');
    await driver.findElement(By.name('password')).sendKeys('YourPassword');
    await driver.findElement(By.name('reenterPassword')).sendKeys('YourPassword');
    console.log('Fill in register info.');

    await delay(3000);
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
    //await driver.findElement(By.name('username')).sendKeys('thitirutrost@hotmail.com');
    //await driver.findElement(By.name('username')).sendKeys('1111');
    //await driver.findElement(By.name('password')).sendKeys('2572454'); 
    await driver.findElement(By.name('username')).sendKeys('stepoftz@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('123456');
    await driver.findElement(By.tagName('button')).click();
    console.log('Fill in login info and click login.');
    await delay(2000);

    await driver.wait(until.titleIs('Create Next App'), 3000);

    await driver.findElement(By.className('nav_rightside__fuSzv')).click();
    await delay(1000);

    await driver.findElement(By.className('nav_dropdownContentProfile__KfzNB')).findElement(By.xpath('//span[text()="My Profile"]')).click();
    await delay(1000);

    await driver.findElement(By.className('page_container__2LWFJ')).findElement(By.className('page_edit_profile_button__bc69_')).click();
    await delay(1000);


    await driver.wait(until.titleIs('DekHor | Profile Edit'), 3000);
    await driver.findElement(By.className('pfedit_usernameedit__Y2f8P')).sendKeys('step');
    const filePath = path.join(__dirname, 'PP1.jpeg');
    let fileInput = await driver.findElement(By.className('pfedit_uploadbtn___tge5')).findElement(By.css('input[type="file"]'));
    await fileInput.sendKeys(filePath);
    await delay(1000);
    await driver.findElement(By.className('pfedit_update__EllKo')).click();
    await delay(1000);

   // await driver.switchTo().alert().accept(); 
   // console.log('Close alert');

    await delay(1000);


  } 
  catch (error) {
    console.error('Test failed:', error); } 
  
  finally {
    // Close the browser
    await driver.quit();
  }
})();