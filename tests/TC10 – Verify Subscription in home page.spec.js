// Título: TC10 - Verify Subscription in home page
// Descrição: Valida a inscrição na newsletter localizada no rodapé da página inicial,
// verificando se a mensagem de confirmação de sucesso é exibida.
const { test, expect } = require("@playwright/test");

test("TC10 - Verify Subscription in home page", async ({ page }) => {
  await page.goto("https://www.automationexercise.com");
  const botaoConsent = page.locator('button:has-text("Consent")');
  if (await botaoConsent.isVisible()) await botaoConsent.click();

  await page.locator("#susbscribe_email").scrollIntoViewIfNeeded();

  await page.locator("#susbscribe_email").fill("denisfortnite2022@gmail.com");
  await page.locator("#subscribe").click();

  await expect(
    page.getByText("You have been successfully subscribed!"),
  ).toBeVisible();
});
