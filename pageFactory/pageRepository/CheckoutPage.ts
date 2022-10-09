import { WebActions } from "@lib/WebActions";
import { Page } from "@playwright/test";
import { Exchange } from "@lib/types";
import { CheckoutPageObjects } from "../objectRepository/CheckoutPageObjects";

let webActions: WebActions;

export class CheckoutPage extends CheckoutPageObjects{
  readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

  async clickOnPayAndSubscribe() {
    await webActions.clickElement(CheckoutPageObjects.I_AGREE_CHECKBOX);
    await webActions.clickElement(CheckoutPageObjects.PAY_AND_SUBCRIBE_BTN);
  }
}