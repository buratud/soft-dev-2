const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const delay = ms => new Promise(res => setTimeout(res, ms));
var assert = require('assert');
const firefoxOptions = new firefox.Options().setBinary('path/to/firefox');

const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOptions)
  .build();

// Navigate to web DekHor
(async function User_can_access_to_all_portal_and_feature() {
  try {
    await driver.get('https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/develop');
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

    //Header,Navbar Access Test
    // Access Blogs feature
    console.log('Header part');
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Blogs"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="Main"]')).click();
    console.log('Go to blog main page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    
    await delay(1000);
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Blogs"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="All Blogs"]')).click();
    console.log('Go to blog page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');

    await delay(1000);
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Blogs"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="Blogging"]')).click();
    console.log('Go to blog create page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');

    await delay(1000);
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Blogs"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="Bloggers"]')).click();
    console.log('Go to bloger page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');


    // Access Dorms feature
    await delay(1000);
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Dorms"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="Main"]')).click();
    console.log('Go to dorm main page');
    await delay(2000);
    await driver.findElement(By.className('nav_leftside__0MbTt')).click();
    console.log('Redirect to home page');

    await delay(1000);
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Dorms"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="All Dorms"]')).click();
    console.log('Go to dorm page');
    await delay(2000);
    await driver.findElement(By.className('nav_leftside__0MbTt')).click();
    console.log('Redirect to home page');

    await delay(1000);
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Dorms"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="Add Dorm"]')).click();
    console.log('Go to dorm add page');
    await delay(2000);
    await driver.findElement(By.className('nav_leftside__0MbTt')).click();
    console.log('Redirect to home page');


    // Access Market feature
    await delay(1000);
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Markets"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="Main"]')).click();
    console.log('Go to market main page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');

    await delay(1000);
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Markets"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="All Products"]')).click();
    console.log('Go to market product page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');

    await delay(1000);
    await driver.findElement(By.className('nav_dropdown__8bw8j')).findElement(By.xpath('//div[text()="Markets"]')).click();
    await delay(1000);
    console.log('Wait for drop bar to appear');
    await driver.findElement(By.xpath('//span[text()="Manage Product"]')).click();
    console.log('Go to manage product page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');

    // Access Profile feature
    await delay(1000);
    await driver.findElement(By.className('nav_rightside__fuSzv')).click();
    await delay(1000);
    await driver.findElement(By.className('nav_dropdownContentProfile__KfzNB')).findElement(By.xpath('//span[text()="My Profile"]')).click();
    console.log('Go to profile page');
    await delay(2000);
    await driver.findElement(By.className('nav_leftside__KJoZ9')).click();

    await delay(1000);
    await driver.findElement(By.className('nav_rightside__fuSzv')).click();
    await delay(1000);
    await driver.findElement(By.className('nav_dropdownContentProfile__KfzNB')).findElement(By.xpath('//span[text()="Support"]')).click();
    console.log('Go to Support page');
    await delay(2000);
    await driver.findElement(By.className('nav_leftside__KJoZ9')).click();
    console.log('Redirect to home page');

    // Access main portal
    console.log('Main portal and body part');
    await delay(1000);
    await driver.findElement(By.className('page_portal__H6OVg')).findElement(By.xpath('//p[text()="DekHor Dorms"]')).click();
    console.log('Go to dorm main page');
    await delay(2000);
    await driver.findElement(By.className('nav_leftside__0MbTt')).click();
    console.log('Redirect to home page');

    await delay(1000);
    await driver.findElement(By.className('page_portal__H6OVg')).findElement(By.xpath('//p[text()="DekHor Markets"]')).click();
    console.log('Go to market main page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');

    await delay(1000);
    await driver.findElement(By.className('page_portal__H6OVg')).findElement(By.xpath('//p[text()="DekHor Blogs"]')).click();
    console.log('Go to blog main page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');

    // Access feature in body page
    await delay(1000);
    await driver.findElement(By.className('page_poster_button_blog__iaiU_')).click();
    console.log('Go to blog writing page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');

    await delay(1000);
    await driver.findElement(By.className('page_poster_button_discover__nzAjU')).click();
    console.log('Go to dorm page');
    await delay(2000);
    await driver.findElement(By.className('nav_leftside__0MbTt')).click();
    console.log('Redirect to home page');

    await delay(1000);
    await driver.findElement(By.className('page_poster_info_market__akBQw')).findElement(By.className('page_poster_button_discover__nzAjU')).click();
    console.log('Go to market page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    await delay(2000);


    // Access feature in body page dynamic part
    await driver.findElement(By.xpath('/html/body/div/div[4]/div[1]/div[2]/main/a[1]')).click();
    console.log('Go to recomment blog1 page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    await delay(2000);

    await driver.findElement(By.xpath('/html/body/div/div[4]/div[1]/div[2]/main/a[2]')).click();
    console.log('Go to recomment blog2 page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    await delay(2000);

    await driver.findElement(By.xpath('/html/body/div/div[4]/div[1]/div[2]/main/a[3]')).click();
    console.log('Go to recomment blog3 page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    await delay(2000);

    await driver.findElement(By.xpath('/html/body/div/div[4]/div[3]/div[2]/div[2]/div/ul/li[1]')).click();
    console.log('Go to recomment product1 page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    await delay(2000);

    await driver.findElement(By.xpath('/html/body/div/div[4]/div[3]/div[2]/div[2]/div/ul/li[2]')).click();
    console.log('Go to recomment product2 page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    await delay(2000);

    await driver.findElement(By.xpath('/html/body/div/div[4]/div[3]/div[2]/div[2]/div/ul/li[3]')).click();
    console.log('Go to recomment product3 page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    await delay(2000);

    await driver.findElement(By.className('react-multiple-carousel__arrow react-multiple-carousel__arrow--right')).click();
    console.log('click slide button');
    await delay(2000);
    await driver.findElement(By.xpath('/html/body/div/div[4]/div[3]/div[2]/div[2]/div/ul/li[4]')).click();
    console.log('Go to recomment product4 page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    await delay(2000);


    // Access feature in footer
    console.log('Footer part');
    await driver.findElement(By.linkText('Home')).click();
    await delay(2000);

    await driver.findElement(By.linkText('Blogs')).click();
    console.log('Go to blog page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    await delay(2000);

    await driver.findElement(By.linkText('Dorms')).click();
    console.log('Go to dorm page');
    await delay(2000);
    await driver.findElement(By.className('nav_leftside__0MbTt')).click();
    console.log('Redirect to home page');
    await delay(2000);

    await driver.findElement(By.linkText('Markets')).click();
    console.log('Go to blog page');
    await delay(2000);
    await driver.findElement(By.className('leftside')).findElement(By.className('logo')).click();
    console.log('Redirect to home page');
    await delay(2000);

    await driver.findElement(By.className('nav_rightside__fuSzv')).click();
    await delay(1000);
    await driver.findElement(By.className('nav_dropdownContentProfile__KfzNB')).findElement(By.xpath('//span[text()="Log out"]')).click();
    console.log('Log out');
    await delay(2000);

} finally {
    // Close the browser
    await driver.quit();
  }
})();