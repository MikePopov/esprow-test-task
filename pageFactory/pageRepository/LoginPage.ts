import { Page } from "@playwright/test";
import { WebActions } from "../../lib/WebActions";
import { testConfig } from "../../testconfig";
import { LoginPageObjects } from "../objectRepository/LoginPageObjects";


let webActions: WebActions;

export class LoginPage extends LoginPageObjects{
  readonly page: Page

  constructor(page: Page){
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async navigateToURL(): Promise<void> {
    await webActions.navigateToUrl('/auth/sign-in');
  }

  async loginToApplication(): Promise<void> {
    // const decipherPassword = await webActions.decipherPassword();
    await webActions.enterElementText(LoginPageObjects.EMAIL_INPUT, testConfig.username);
    await webActions.enterElementText(LoginPageObjects.PASSWORD_PASSWORD, testConfig.password);
    await webActions.clickElement(LoginPageObjects.SIGN_IN_BUTTON);
  }
}