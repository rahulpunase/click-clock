import { expect, test } from "@playwright/test";

test.describe("Testing general flows. Page", () => {
  test("has title", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await expect(page).toHaveTitle(/Click clock/);
  });
});
