import { WebActions } from "@lib/WebActions";
import { Page } from "@playwright/test";
import { Exchange } from "@lib/types";
import { CartPageObjects } from "../objectRepository/CartPageObjects";
import { MainMenuObjects } from "../objectRepository/MainMenuObjeccts";

let webActions: WebActions;

export class MainMenu extends MainMenuObjects{
  readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

  async openSubscriptionPage() {
    await webActions.hoverElement(MainMenuObjects.USER_MENU);
    await webActions.clickElement(MainMenuObjects.SUBSCRIPTION_MENU);
    // this.page.waitForRequest('https://etpmarkets.com/api/v1/payments/prices')
    await Promise.all([
      this.page.waitForRequest(req => req.url().includes('/api/v1/payments/prices') && req.method() === 'POST'),]);
    await webActions.mouseMove();
  }
}