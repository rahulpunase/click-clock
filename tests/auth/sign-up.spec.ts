import { expect, test } from "@playwright/test";

import { seedUser, urlUtils } from "../utils";

test.describe("Testing sign up flow", () => {
  test("is able to sign up", async ({ page }) => {
    const url = urlUtils(page);

    await url.visitUrl("auth/sign-up");

    const label = page.locator("#app-loader");

    expect(label).toBeVisible();

    await page.waitForSelector("#app-loader", { state: "detached" });

    await page.locator('input[name="fullName"]').fill(seedUser.name);
    await page.locator('input[name="email"]').fill(seedUser.email);
    await page.locator('input[name="password"]').fill(seedUser.password);
    await page.locator('input[name="confirmPassword"]').fill(seedUser.password);

    await page.getByText(/Sign Up to continue/).click();

    await page.waitForURL(url.getBaseUrlWithPath("onboarding"));
  });
});
