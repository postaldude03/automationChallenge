const { chromium } = require('playwright');
const {test, expect} = require("playwright/test");


test('Test1',async () => {
    // launching the Chromium browser, creating a new context in the browser, opening a new page in the created context
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Step 1: navigating to the page
    console.log('Navigating to the main page and verifying the bookmarks:');
    await page.goto('https://www.sapfioneer.com/');
    await page.waitForLoadState('load');

    // Step 2: verifying if the bookmarks from the list are visible
    const bookmarks = ['Banking', 'Insurance', 'Finance & ESG', 'Services', 'Partners', 'Company', 'Resources'];
    for (const bookmarkName of bookmarks) {
        // selecting the element by classname and text to make sure that correct element is verified
        expect(await page.isVisible(`//a[@class='nav-top-link' and text()='${bookmarkName}']`),`Failed! Bookmark '${bookmarkName}' is not visible.`).toBe(true);
    }
    console.log('Passed! All bookmarks from the list are visible.');
    await browser.close();
});