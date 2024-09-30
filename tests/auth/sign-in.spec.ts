import { expect, test } from "@playwright/test";

import { goto, urlUtils } from "../utils";

test.describe("Testing sign in flow", () => {
  test("is able to sign in", async ({ page }) => {
    const url = urlUtils(page);
    await url.visitSite();

    const label = page.locator("#app-loader");

    expect(label).toBeVisible();

    await page.waitForSelector("#app-loader", { state: "detached" });

    await page.locator('input[name="email"]').fill("amit@gmail.com");
    await page.locator('input[name="password"]').fill("amit@gmail.com");

    await page.getByText(/Login to continue/).click();

    expect(page).toHaveURL("/home");

    // testing
  });
});
