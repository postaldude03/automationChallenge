import testSetup from "../utils/testSetup";
import {test, expect} from "playwright/test";

test('Test1', async () => {
    // Step 1: setting up the context and navigating to the main page
    const {page, browser} = await testSetup();
    // Step 2: verifying if the bookmarks from the list are visible
    const bookmarks = ['Banking', 'Insurance', 'Finance & ESG', 'Services', 'Partners', 'Company', 'Resources'];
    for (const bookmarkName of bookmarks) {
        await expect.soft(page.locator(`//a[@class='nav-top-link' and text()='${bookmarkName}']`), `Failed! Bookmark '${bookmarkName}' is not visible.`).toBeVisible();
    }
    expect(test.info().errors).toHaveLength(0);  // failing the test if at least one of the soft checks is not ok
    await browser.close();
});