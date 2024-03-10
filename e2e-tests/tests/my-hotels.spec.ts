import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("admin@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Login success")).toBeVisible();
});

test("should be able to save hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator("[name='name']").fill("Test Hotel");
  await page.locator("[name='city']").fill("Test City");
  await page.locator("[name='country']").fill("Test country");
  await page
    .locator("[name='description']")
    .fill("Test Lrem ipsum some description");
  await page.locator("[name='pricePerNight']").fill("100");
  await page.selectOption("select[name='starRating']", "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();
  await page.locator("[name='adultCount']").fill("2");
  await page.locator("[name='childCount']").fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "test.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 20000 });
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Harsh Thakur")).toBeVisible();
  await expect(page.getByText("Lorem ipsum")).toBeVisible();
  await expect(page.getByText("Shimla,India")).toBeVisible();
  await expect(page.getByText("Budget").first()).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });

  await expect(page.locator('[name="name"]')).toHaveValue("Harsh Thakur");

  await page.locator('[name="name"]').fill("Lorem Ipsum");
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Updated")).toBeVisible();

  await page.reload();
  await expect(page.locator('[name="name"]')).toHaveValue("Lorem Ipsum");
  await page.locator('[name="name"]').fill("Harsh Thakur");

  await page.getByRole("button", { name: "Save" }).click();
});
