import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly goToLoginButton: Locator;
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly captchaField: Locator;
    private readonly loginButton: Locator;
    private readonly errorLabel: Locator;
    private readonly imgCaptcha:Locator;


    constructor(page: Page) {
        this.page = page;
        this.goToLoginButton = page.locator('#HeaderControl_Login_CD span');
        this.usernameField = page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtEmail_I');
        this.passwordField = page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtPassword_I_CLND');
        this.captchaField = page.locator('#HeaderControl_LogonControl_LoginFormLayout_Captcha_TB_I');
        this.loginButton = page.locator('#HeaderControl_LogonControl_btnLoginNow_CD span');
        this.errorLabel = page.getByText('The submitted code is incorrect');
        this.imgCaptcha = page.getByRole('img',{name:'Captcha image'});
    }

    public async goToPage() {
        await this.page.goto('https://demos.devexpress.com/rwa/dxhotels/');
    }

    public async goToLogin() {
        await this.goToLoginButton.click();
    }
    public async login(email: string, password: string, code: string = '') {
        await this.usernameField.fill(email);
        await this.passwordField.fill(password);
        await this.captchaField.fill(code);
        await this.loginButton.click();

    }


    public viewErrorLabel(): Locator {
        return this.errorLabel
    }

    /**
     * 
     * @param imgName name o imagen path
     */
    public async takeCaptchaScreenshot(imgName:string){
        await this.imgCaptcha.screenshot({path:imgName})
    }

}