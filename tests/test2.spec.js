import testSetup from "../utils/testSetup";
import {test, expect} from "playwright/test";

test('Test2', async () => {
    // Step 1: setting up the context and navigating to the main page
    const {page, browser} = await testSetup();
    // Step 2: click on the 'Financial Control' link
    await page.hover('//a[@class="nav-top-link" and text()="Finance & ESG"]')
    await page.click('//a[@class="nav-top-link" and text()="Finance & ESG"]/following::span[text()=" Financial Control "]');
    await page.waitForLoadState('load');
    // Step 3: verify the redirection
    await expect(page, `User is not on the correct page`).toHaveURL('https://www.sapfioneer.com/finance-esg/financial-control/');
    await browser.close();
});
