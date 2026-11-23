// Título: TC04 - Logout User
// Descrição: Valida o fluxo de saída do sistema (logout). O teste realiza o login,
// clica na opção de sair e verifica se o usuário foi redirecionado para a tela de login.
const { test, expect } = require("@playwright/test");

test("TC04 - Logout User", async ({ page }) => {
  page.setDefaultTimeout(15000);
  await page.goto("https://www.automationexercise.com/login");

  const botaoConsent = page.locator('button:has-text("Consent")');
  if (await botaoConsent.isVisible()) await botaoConsent.click();

  // Login
  const campoEmail = page.locator('input[data-qa="login-email"]');
  await campoEmail.waitFor({ state: "visible" });
  await campoEmail.fill("denisfortnite2022@gmail.com");

  const campoSenha = page.locator('input[type="password"]');
  await campoSenha.waitFor({ state: "visible" });
  await campoSenha.fill("ads654321");

  await page.locator('button[data-qa="login-button"]').click();
  await expect(page.getByText("Logged in as")).toBeVisible();

  await page.getByRole("link", { name: "Logout" }).click();

  await expect(page.getByText("Login to your account")).toBeVisible();
});
