import {chromium} from "playwright";
import {test, expect} from "playwright/test";

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
    expect(currentURL === expectedURL,`Failed! The redirection was not correct: expected URL '${expectedURL}', actual URL '${currentURL}'.`).toBe(true);
    console.log('Passed! The user is on the correct page.');
    await browser.close();
});
