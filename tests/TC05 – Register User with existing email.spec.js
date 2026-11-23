// Título: TC05 - Register User with existing email
// Descrição: Valida a tentativa de cadastro de um novo usuário utilizando um e-mail já existente,
// verificando se o sistema bloqueia a ação e exibe o erro "Email Address already exist!".
const { test, expect } = require("@playwright/test");

test("TC05 - Register User with existing email", async ({ page }) => {
  await page.goto("https://www.automationexercise.com");

  const botaoConsent = page.locator('button:has-text("Consent")');
  if (await botaoConsent.isVisible()) await botaoConsent.click();

  await page.getByText("Signup / Login").click();
  await expect(page.getByText("New User Signup!")).toBeVisible();

  await page.getByPlaceholder("Name").fill("Usuario Teste");
  await page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address")
    .fill("denisfortnite2022@gmail.com");
  await page.getByRole("button", { name: "Signup" }).click();

  await expect(page.getByText("Email Address already exist!")).toBeVisible();
});
