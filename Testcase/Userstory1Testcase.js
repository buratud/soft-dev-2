// This implement base on figma maynot operate with actual website.
const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

// Set the path to the Firefox executable 
const firefoxOptions = new firefox.Options().setBinary('path/to/firefox');

// Create a new instance of the Firefox driver
const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOptions)
  .build();


// Navigate to the specified website
(async function example() {
    try {
      await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
  
      // Input registration details
      await driver.findElement(By.id('username')).sendKeys('YourUsername');
      await driver.findElement(By.id('email')).sendKeys('you@example.com');
      await driver.findElement(By.id('password')).sendKeys('YourPassword');
      await driver.findElement(By.id('reEnterPassword')).sendKeys('YourPassword');
  
      // Click the register button
      await driver.findElement(By.id('registerButton')).click();
  
      // Wait until the registration is completed or navigate to the next page
      await driver.wait(until.titleContains('Verify page'), 10000);

      const verificationCode = '123456'; // Replace with the actual verification code
      await driver.findElement(By.id('verificationInput')).sendKeys(verificationCode);
  
      // Click the submit button
      await driver.findElement(By.id('submitVerificationButton')).click();
  
      // Navigate back to the login page (assuming there is a link or button to go back)
      await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/login');
  
      // Input login details
      await driver.findElement(By.id('loginId')).sendKeys('YourLoginId');
      await driver.findElement(By.id('loginPassword')).sendKeys('YourLoginPassword');
  
      // Click the login button
      await driver.findElement(By.id('loginButton')).click();
  
      // Wait until the login is completed or navigate to the dashboard page
      await driver.wait(until.titleContains('Home'), 10000);
  
      console.log('Successfully registered and logged in on the specified website in Firefox.');
    } finally {
      // Close the browser
      await driver.quit();
    }
  })();