// Título: TC03 - Login User with incorrect email and password
// Descrição: Valida a tentativa de login com credenciais inválidas,
// verificando se a mensagem de erro "Your email or password is incorrect!" é exibida.
const { test, expect } = require("@playwright/test");

test("TC03 - Login User with incorrect email and password", async ({
  page,
}) => {
  page.setDefaultTimeout(15000);
  await page.goto("https://www.automationexercise.com/login");

  const botaoConsent = page.locator('button:has-text("Consent")');
  if (await botaoConsent.isVisible()) await botaoConsent.click();

  const campoEmail = page.locator('input[data-qa="login-email"]');
  await campoEmail.waitFor({ state: "visible" });
  await campoEmail.fill("denisfortnite2022@gmail.com");

  const campoSenha = page.locator('input[type="password"]');
  await campoSenha.waitFor({ state: "visible" });
  await campoSenha.fill("senha_errada_123");

  await page.locator('button[data-qa="login-button"]').click();

  await expect(
    page.getByText("Your email or password is incorrect!"),
  ).toBeVisible();
});
