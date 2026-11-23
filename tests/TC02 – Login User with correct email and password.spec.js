// Título: TC02 - Login User with correct email and password
// Descrição: Valida a autenticação no sistema utilizando um e-mail e senha válidos,
// verificando se a mensagem "Logged in as" é exibida.
const { test, expect } = require("@playwright/test");

test("TC02 - Login User with correct email and password", async ({ page }) => {
  page.setDefaultTimeout(15000);

  await page.goto("https://www.automationexercise.com/login");

  const botaoConsent = page.locator('button:has-text("Consent")');
  if (await botaoConsent.isVisible()) {
    await botaoConsent.click();
  }

  const campoEmail = page.locator('input[data-qa="login-email"]');
  await campoEmail.waitFor({ state: "visible" });
  await campoEmail.fill("denisfortnite2022@gmail.com");

  const campoSenha = page.locator('input[type="password"]');
  await campoSenha.waitFor({ state: "visible" });
  await campoSenha.fill("ads654321");

  await page.locator('button[data-qa="login-button"]').click();

  await expect(page.getByText("Logged in as")).toBeVisible();
});
