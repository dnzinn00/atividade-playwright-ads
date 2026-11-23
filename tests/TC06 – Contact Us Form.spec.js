// Título: TC06 - Contact Us Form
// Descrição: Valida o envio do formulário "Fale Conosco", preenchendo os dados,
// realizando o upload de um arquivo na pasta fixtures e verificando a mensagem de sucesso.
const { test, expect } = require("@playwright/test");

test("TC06 - Contact Us Form", async ({ page }) => {
  page.setDefaultTimeout(15000);
  await page.goto("https://www.automationexercise.com/contact_us");

  const botaoConsent = page.locator('button:has-text("Consent")');
  if (await botaoConsent.isVisible()) await botaoConsent.click();

  await expect(page.getByText("GET IN TOUCH")).toBeVisible();

  await page.locator('input[data-qa="name"]').fill("Usuario Teste");
  await page
    .locator('input[data-qa="email"]')
    .fill("denisfortnite2022@gmail.com");
  await page.locator('input[data-qa="subject"]').fill("Duvida");
  await page
    .locator('textarea[data-qa="message"]')
    .fill("Mensagem de teste automatizado.");

  await page
    .locator('input[type="file"]')
    .setInputFiles("./fixtures/arquivo_teste.txt");

  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await page.locator('input[data-qa="submit-button"]').click();

  const mensagemSucesso = page.locator(".status.alert.alert-success");
  await expect(mensagemSucesso).toBeVisible();
  await expect(mensagemSucesso).toContainText(
    "Success! Your details have been submitted successfully.",
  );
});
