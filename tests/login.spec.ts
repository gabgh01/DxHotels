import { expect, test, type Page } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { ImageReader } from '../src/utils/ImageReader';



test.describe('login DX Hotels', () => {

  test('Login fail', async ({ page }) => {
    const user = {
      email: 'test@yopmail.com',
      password: '123456',
      code: '1234'
    }
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goToPage();
    await loginPage.goToLogin();
    await loginPage.login(user.email, user.password, user.code);
    await expect(loginPage.viewErrorLabel()).toBeVisible();
  });
  
  test('Login ok', async ({ page }) => {
    const user = {
      email: 'test@yopmail.com',
      password: '123456'
    }

    const loginPage = new LoginPage(page);
    const imgReader = new ImageReader();
    const path = 'captcha.png';
    
    await loginPage.goToPage();
    await loginPage.goToLogin();
    loginPage.takeCaptchaScreenshot(path);
    const text = await imgReader.convertToText(path);
    await loginPage.login(user.email, user.password, text);
    await expect(loginPage.viewErrorLabel()).not.toBeVisible();
  });

})
