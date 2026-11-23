// Título: TC01 - Register User
// Descrição: Valida o cadastro completo de um novo usuário, verifica a mensagem de sucesso
// e deleta a conta ao final para permitir a repetição do teste.
const { test, expect } = require("@playwright/test");

test("TC01 - Register User", async ({ page }) => {
  const emailDinamico = `teste_${Date.now()}@email.com`;

  await page.goto("https://www.automationexercise.com");

  const botaoConsent = page.locator('button:has-text("Consent")');
  if (await botaoConsent.isVisible()) {
    await botaoConsent.click();
  }

  await page.getByText("Signup / Login").click();
  await page.getByPlaceholder("Name").fill("Usuario Teste");
  await page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address")
    .fill(emailDinamico);
  await page.getByRole("button", { name: "Signup" }).click();

  await expect(page.getByText("ENTER ACCOUNT INFORMATION")).toBeVisible();

  await page.getByLabel("Mr.").check();
  await page.locator("#password").fill("senha123456");

  await page.locator("#days").selectOption("10");
  await page.locator("#months").selectOption("5");
  await page.locator("#years").selectOption("1990");

  await page.locator("#first_name").fill("Usuario");
  await page.locator("#last_name").fill("Teste");
  await page.locator("#company").fill("Empresa Teste");
  await page.locator("#address1").fill("Rua Teste 123");
  await page.locator("#address2").fill("Apto 45");
  await page.locator("#country").selectOption("Canada");
  await page.locator("#state").fill("Ontario");
  await page.locator("#city").fill("Toronto");
  await page.locator("#zipcode").fill("12345");
  await page.locator("#mobile_number").fill("11999999999");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("ACCOUNT CREATED!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
  await expect(page.getByText("Logged in as")).toBeVisible();

  await page.getByRole("link", { name: "Delete Account" }).click();

  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await expect(page.getByText("ACCOUNT DELETED!")).toBeVisible();
});
