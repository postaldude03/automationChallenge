import {chromium} from "playwright";

export default async function testSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.sapfioneer.com/');
    await page.waitForLoadState('load');
    return {page, browser};
}