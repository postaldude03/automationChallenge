const { chromium } = require('playwright');
const {test} = require("playwright/test");

test('Test3',async () => {
    // launching the Chromium browser, creating a new context in the browser, opening a new page in the created context
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Step 1: go to the main page
    console.log('Navigating to the main page and clicking on the "Get in touch" button.');
    await page.goto('https://www.sapfioneer.com/');
    await page.click('//span[text()="Get in touch"]');
    await page.waitForLoadState('load');

    // Step 2: verify the redirection
    console.log('Checking if user was redirected to the correct page.');
    const expectedURL = 'https://www.sapfioneer.com/contact/';
    const currentURL = page.url();
    if (currentURL === expectedURL) {
        console.log('User is on the correct page.');
    } else {
        console.log(`Failed! The redirection was not correct: expected URL "${expectedURL}", actual URL "${currentURL}".`);
        process.exit(1);
    }
    // Step 3: click the "Submit" button on an empty contact form
    // selecting the iframe and clicking on the button
    const iframe = await page.waitForSelector('iframe');
    const iframeContent = await iframe.contentFrame();
    await iframeContent.click('//input[@value="Submit"]');
    console.log('The empty contact form was submitted.');

    // Step 4: verify the validation error messages
    try {
        console.log('Verifying the validation error messages:');
        await iframeContent.waitForSelector('//input[@name="firstname"]/following::label[text()="Please complete this required field."]', {timeout : 3000})
        console.log('The correct error is displayed for the mandatory field "First name".');

        await iframeContent.waitForSelector('//input[@name="lastname"]/following::label[text()="Please complete this required field."]', {timeout : 3000})
        console.log('The correct error is displayed for the mandatory field "Last name".');

        await iframeContent.waitForSelector('//input[@name="email"]/following::label[text()="Please complete this required field."]', {timeout : 3000})
        console.log('The correct error is displayed for the mandatory field "Work email".');

        await iframeContent.waitForSelector('//select[@name="country__new_"]/following::label[text()="Please select an option from the dropdown menu."]', {timeout : 3000})
        console.log('The correct error is displayed for the mandatory choice "Country".');

        await iframeContent.waitForSelector('//textarea[@name="how_can_we_help_you_"]/following::label[text()="Please complete this required field."]', {timeout : 3000})
        console.log('The correct error is displayed for the mandatory field "How can we help you?".');

        await iframeContent.waitForSelector('//input[@name="LEGAL_CONSENT.processing"]/following::label[text()="Please complete this required field."]', {timeout : 3000})
        console.log('The correct error is displayed for the mandatory checkbox.');

        await iframeContent.waitForSelector('//label[text()="Please complete all required fields."]', {timeout : 3000})
        console.log('The correct error is displayed if not all mandatory fields are filled-in.');
    } catch (error) {
        throw new Error('Failed! The expected error was not found - see the report.');
    }
    console.log('Passed! All validation error messages are displayed.');
    await browser.close();
});
