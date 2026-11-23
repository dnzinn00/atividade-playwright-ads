// Título: TC07 - Verify Test Cases Page
// Descrição: Valida a navegação para a página de "Test Cases" através do menu principal,
// verificando se a URL muda e se o título da página é exibido corretamente.
const { test, expect } = require("@playwright/test");

test("TC07 - Verify Test Cases Page", async ({ page }) => {
  await page.goto("https://www.automationexercise.com");
  const botaoConsent = page.locator('button:has-text("Consent")');
  if (await botaoConsent.isVisible()) await botaoConsent.click();

  await page.getByRole("link", { name: "Test Cases" }).first().click();

  await expect(page).toHaveURL("https://www.automationexercise.com/test_cases");
  await expect(
    page.getByText("Test Cases", { exact: true }).first(),
  ).toBeVisible();
});
