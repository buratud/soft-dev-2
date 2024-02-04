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

// Navigate to web
(async function example() {
  try {
    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');

    // Wait until the title of the page becomes "home"
    await driver.wait(until.titleIs('home'), 1000);

    console.log('Successfully opened Dekhor in Firefox.');
  } finally {
    // Close the browser
    await driver.quit();
  }
})();