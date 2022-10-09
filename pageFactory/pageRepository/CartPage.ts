import { WebActions } from "@lib/WebActions";
import { Page } from "@playwright/test";
import { Exchange } from "@lib/types";
import { CartPageObjects } from "../objectRepository/CartPageObjects";

let webActions: WebActions;

export class CartPage extends CartPageObjects{
  readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

  async clickOnProceedCheckout() {
    await webActions.clickElement(CartPageObjects.PROCEED_TO_CHECKOUT_BTN);
  }
}