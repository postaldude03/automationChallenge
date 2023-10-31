import {chromium} from "playwright";
import {test, expect} from "playwright/test";

test('Test2', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    // Step 1: go to the page
    await page.goto('https://www.sapfioneer.com/');
    await page.waitForLoadState('load');
    // Step 2: click on the 'Financial Control' link
    await page.hover('//a[@class="nav-top-link" and text()="Finance & ESG"]')
    await page.click('//a[@class="nav-top-link" and text()="Finance & ESG"]/following::span[text()=" Financial Control "]');
    await page.waitForLoadState('load');
    // Step 3: verify the redirection
    await expect(page, `Failed! User is not on the correct page`).toHaveURL('https://www.sapfioneer.com/finance-esg/financial-control/');
    await browser.close();
});
