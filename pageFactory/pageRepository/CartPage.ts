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

  async verifyData(subscriptionData: Exchange) {
    await webActions.waitForPageNavigation('load')
    // 4. I see "Protocol price" with "50$"
    await webActions.verifyElementContainsText(CartPageObjects.PRTOCOL_COST, subscriptionData.protocolCost.toString())
    // 5. I see "Sessions price" with "10$"
    await webActions.verifyElementContainsText(CartPageObjects.SESSION_COST, subscriptionData.sessionCost.toString())
  // 6. I see "Pay now" with "60$"
    const payment = subscriptionData.sessionCost + subscriptionData.protocolCost
    await webActions.verifyElementContainsText(CartPageObjects.PAY_NOW, payment.toString())
    // 7. I see "Next charge " with "Date"
    // 8. I see "Next charge " with "60$"
    await webActions.verifyElementContainsText(CartPageObjects.NEXT_CHARGE, payment.toString())
  }
}