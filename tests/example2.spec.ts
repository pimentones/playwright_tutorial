import { test, expect, type Page } from "@playwright/test";
import { HomePage } from "../pages/home-page";

const URL = "https://playwright.dev/";
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
  //   await page.getByRole("link", { name: "Get started" }).click();
  await homePage.clickGetStarted();
}

test.describe("Playwright tutorial", () => {
  test("has title", async () => {
    // Expect a title "to contain" a substring.
    await homePage.assertPageTitle();
  });

  test("get started link", async ({ page }) => {
    // Click the get started link.
    await clickGetStarted(page);

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole("heading", { name: "Installation" })
    ).toBeVisible();
  });

  test.only("check java page pedro", async ({ page }) => {
    await clickGetStarted(page);
    await page.getByRole("button", { name: "Node.js" }).hover();
    await page.getByText("Java", { exact: true }).click();

    await expect(page).toHaveURL("https://playwright.dev/java/docs/intro");
    await expect(
      page.getByText("Installing Playwright", { exact: true })
    ).not.toBeVisible();

    const javaCopy = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
    await expect(page.getByText(javaCopy)).toBeVisible();
  });
});
