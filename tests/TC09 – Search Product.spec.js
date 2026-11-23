// Título: TC09 - Search Product
// Descrição: Valida a funcionalidade de busca do site. O teste acessa a página de produtos,
// pesquisa por um termo específico (ex: "Top") e verifica se a tela de resultados é exibida.
const { test, expect } = require("@playwright/test");

test("TC09 - Search Product", async ({ page }) => {
  await page.goto("https://www.automationexercise.com");
  const botaoConsent = page.locator('button:has-text("Consent")');
  if (await botaoConsent.isVisible()) await botaoConsent.click();

  await page.getByRole("link", { name: "Products" }).first().click();
  await expect(page.getByText("All Products")).toBeVisible();

  await page.locator("#search_product").fill("Top");
  await page.locator("#submit_search").click();

  await expect(page.getByText("Searched Products")).toBeVisible();
});
