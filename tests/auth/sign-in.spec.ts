import { expect, test } from "@playwright/test";

test.describe("Testing sign in flow", () => {
  test("is able to sign in", async ({ page }) => {
    await page.goto("http://localhost:5173/auth/sign-in/");

    const label = page.locator("#app-loader");

    expect(label).toBeVisible();

    await page.waitForSelector("#app-loader", { state: "detached" });

    await page.locator('input[name="email"]').fill("amit@gmail.com");
    await page.locator('input[name="password"]').fill("amit@gmail.com");

    await page.getByText(/Login to continue/).click();

    await expect(page).toHaveURL("http://localhost:5173/home");
  });
});
