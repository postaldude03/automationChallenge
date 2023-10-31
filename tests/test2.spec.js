const { chromium } = require('playwright');
const {test} = require("playwright/test");

test('Test2',async () => {
    // launching the Chromium browser, creating a new context in the browser, opening a new page in the created context
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Step 1: go to the page
    console.log('Navigating to the main page.');
    await page.goto('https://www.sapfioneer.com/');
    await page.waitForLoadState('load');

    // Step 2: click on the 'Financial Control' link
    console.log('Clicking on the "Financial control" link from the "Finance & ESG" bookmark.');
    await page.hover('//a[@class="nav-top-link" and text()="Finance & ESG"]')
    await page.click('//a[@class="nav-top-link" and text()="Finance & ESG"]/following::span[text()=" Financial Control "]');
    await page.waitForLoadState('load');

    // Step 3: verify the redirection
    console.log('Checking if user was redirected to the correct page.');
    const expectedURL = 'https://www.sapfioneer.com/finance-esg/financial-control/';
    const currentURL = page.url();
    if (currentURL === expectedURL) {
        console.log('Passed! The user is on the correct page.');
    } else {
        throw new Error(`Failed! The redirection was not correct: expected URL '${expectedURL}', actual URL '${currentURL}'.`);
    }
    await browser.close();
});
