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

  (async function User_can_open_web_site_and_register() {
    try {
      await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop/blogs/writeblog');
      await delay(3000);
      console.log('Successfully opened write blog in Firefox.');
      // Wait until the title of the page becomes "write blog"  

    } finally {
      // Close the browser
      await driver.quit();
    }
  })();