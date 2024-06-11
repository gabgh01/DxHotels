"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
class LoginPage {
    constructor(page) {
        this.page = page;
        this.goToLoginButton = page.locator('#HeaderControl_Login_CD span');
        this.usernameField = page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtEmail_I');
        this.passwordField = page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtPassword_I_CLND');
        this.captchaField = page.locator('#HeaderControl_LogonControl_LoginFormLayout_Captcha_TB_I');
        this.loginButton = page.locator('#HeaderControl_LogonControl_btnLoginNow_CD span');
        this.errorLabel = page.getByText('The submitted code is incorrect');
    }
    goToPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto('https://demos.devexpress.com/rwa/dxhotels/');
        });
    }
    gologin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.goToLoginButton.click();
        });
    }
    login(email_1, password_1) {
        return __awaiter(this, arguments, void 0, function* (email, password, code = '') {
            yield this.usernameField.fill(email);
            yield this.passwordField.fill(password);
            yield this.captchaField.fill(code);
            yield this.loginButton.click();
        });
    }
    viewErrorLabel() {
        return this.errorLabel;
    }
}
exports.LoginPage = LoginPage;
