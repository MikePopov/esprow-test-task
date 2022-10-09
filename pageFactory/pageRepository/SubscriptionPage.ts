import { WebActions } from "@lib/WebActions";
import { SubscriptonPageObject } from "@objects/SubscriptionPageObjects";
import { Page } from "@playwright/test";
import { Exchange } from "@lib/types";

let webActions: WebActions;

export class SubscriptonPage extends SubscriptonPageObject{
  readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

  async verifyMainMenu(): Promise<void> {
    await webActions.waitForPageNavigation('load');
    await webActions.waitForPageNavigation('domcontentloaded');
    await webActions.verifyElementContainsText(SubscriptonPageObject.HELP_MENU, 'Help');
  }

  async clickOnAddExchange(): Promise<void> {
    await webActions.clickElement(SubscriptonPageObject.ADD_EXCHAGE_BTN);
  }

  async clickOnPay(): Promise<void> {
    await webActions.clickElement(SubscriptonPageObject.PAY_BTN);
  }
  
  async navigateToURL(): Promise<void> {
    await webActions.navigateToUrl('/app/subscription');
  }

  async verifyExchange(isPaid: boolean): Promise<void> {
    await webActions.verifyElementIsDisplayed(SubscriptonPageObject.EXCHANGE_CARD, 'Exchange not created');
    if(isPaid === true){
      await webActions.verifyElementContainsText(SubscriptonPageObject.EXCHANGE_STATUS_PAID, 'Paid')
    } else {
      await webActions.verifyElementContainsText(SubscriptonPageObject.EXCHANGE_STATUS_UNPAID, 'Unpaid')
    }
  }

  async verifyExchangeData(exchange: Exchange): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.PROTOCOL_TYPE, exchange.protocolType)
    await webActions.verifyElementContainsText(SubscriptonPageObject.PROTOCOL_PRICE, exchange.protocolCost.toString())
    const sessionCost = exchange.numberOfSessions*exchange.sessionCost
    const currentPayment = exchange.protocolCost+sessionCost;
    await webActions.verifyElementContainsText(SubscriptonPageObject.CURRENT_PAYMENT, currentPayment.toString());
  }
}