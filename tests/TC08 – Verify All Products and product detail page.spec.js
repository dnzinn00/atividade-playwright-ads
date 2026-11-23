// Título: TC08 - Verify All Products and product detail page
// Descrição: Valida a navegação para a página de produtos, verifica a exibição da lista de produtos
// e acessa os detalhes de um produto específico.
const { test, expect } = require("@playwright/test");

test("TC08 - Verify All Products and product detail page", async ({ page }) => {
  await page.goto("https://www.automationexercise.com");
  const botaoConsent = page.locator('button:has-text("Consent")');
  if (await botaoConsent.isVisible()) await botaoConsent.click();

  await page.getByRole("link", { name: "Products" }).first().click();
  await expect(page).toHaveURL("https://www.automationexercise.com/products");
  await expect(page.getByText("All Products")).toBeVisible();

  await page.getByText("View Product").first().click();

  await expect(page.getByText("Write your review")).toBeVisible();
  await expect(page.locator(".product-information h2")).toBeVisible(); // Nome do produto
});
