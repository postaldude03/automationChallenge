import testSetup from "../utils/testSetup";
import {test, expect} from "playwright/test";

// the list of elements to check in Step 4
const elements = [
    `//input[@name="firstname"]/following::label[text()="Please complete this required field."][1]`,
    `//input[@name="lastname"]/following::label[text()="Please complete this required field."][1]`,
    `//input[@name="email"]/following::label[text()="Please complete this required field."][1]`,
    `//select[@name="country__new_"]/following::label[text()="Please select an option from the dropdown menu."][1]`,
    `//textarea[@name="how_can_we_help_you_"]/following::label[text()="Please complete this required field."][1]`,
    `//input[@name="LEGAL_CONSENT.processing"]/following::label[text()="Please complete this required field."][1]`,
    `//label[text()="Please complete all required fields."][1]`,
];

test('Test3', async () => {
    const {page, browser} = await testSetup();
    // Step 1: Click on 'Get in touch'
    await page.click('//span[text()="Get in touch"]');
    await page.waitForLoadState('load');
    // Step 2: verify the redirection
    await expect(page, `Failed! User is not on the correct page`).toHaveURL('https://www.sapfioneer.com/contact/');
    // Step 3: click the "Submit" button on an empty contact form
    const iframe = await page.waitForSelector('iframe');
    const iframeContent = await iframe.contentFrame();
    await iframeContent.click('//input[@value="Submit"]');
    // Step 4: verify the validation error messages
    for (const element of elements) {
        await expect.soft(iframeContent.locator(`${element}`), 'Failed! The expected error was not found - see the report.').toBeVisible();
    }
    expect(test.info().errors).toHaveLength(0);  // failing the test if at least one of the soft checks is not ok
    await browser.close();
});
