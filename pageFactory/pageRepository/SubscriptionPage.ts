import { WebActions } from "@lib/WebActions";
import { SubscriptonPageObject } from "@objects/SubscriptionPageObjects";
import { Page } from "@playwright/test";
import { Exchange } from "@lib/types";
import { ModificationType } from "../../lib/enums";

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

  async verifyConfirmBtnText(text: string): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.PAY_BTN, text)
  }
  
  async navigateToURL(): Promise<void> {
    await webActions.navigateToUrl('/app/subscription');
  }

  async verifySubscription(isPaid: boolean): Promise<void> {
    await webActions.verifyElementIsDisplayed(SubscriptonPageObject.SUBSCRIPTION_CARD, 'Exchange not created');
    if(isPaid === true){
      await webActions.verifyElementContainsText(SubscriptonPageObject.EXCHANGE_STATUS_PAID, 'Paid')
    } else {
      await webActions.verifyElementContainsText(SubscriptonPageObject.EXCHANGE_STATUS_UNPAID, 'Unpaid')
    }
  }

  async verifySubscriptionData(subscription: Exchange): Promise<void> {
    await this.page.waitForTimeout(1000);
    //   * I see "Protocol type"
    this.verifyProtocolType(subscription.protocolType)
    //   * I see "Protocol price"
    this.verifyProtocolPrice(subscription.protocolCost.toString())
    //   * I see "Number of sessions" with "1"
    this.verifySessionsCount(subscription.numberOfSessions)
    //   * I see "Price of session"
    this.verifySessionPriceInSubscriptionCard(subscription.sessionCost)
     //   * I see "Current payment" 
    const sessionCost = subscription.numberOfSessions*subscription.sessionCost
    const currentPayment = subscription.protocolCost+sessionCost;
    this.verifyCurrentPaymentInSubscriptionCard(currentPayment.toString());
  }

  async verifyCurrentPaymentInSubscriptionCard(payment: string|RegExp): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.CURRENT_PAYMENT, payment)
  }

  async verifySessionsCount(countOfSessions: number): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.COUNT_OF_SESIONS, countOfSessions.toString())
  }

  async verifySessionPriceInSubscriptionCard(sessionCost: number): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.SUBSCRIPTION_CARD, `Price: $${sessionCost.toLocaleString()}`)
  }

  async verifyMonthlyTotalSubscription(price: number): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.MONTHLY_SUBSCRIPTION_TOTAL, price.toString())
  }

  async verifyMonthlyProtocolTypeAndPrice(prtocol: string| RegExp, price: number): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.MONTHLY_TYPE_OF_PROTOCOL_AND_PRICE, prtocol)
    await webActions.verifyElementContainsText(SubscriptonPageObject.MONTHLY_TYPE_OF_PROTOCOL_AND_PRICE, price.toString())
  }

  async verifyMonthlyNumberOfSessionsAndPrice(numberOfSessions: number, price: number): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.MONTHLY_SESSIONS_AND_PRICE, numberOfSessions.toString())
    await webActions.verifyElementContainsText(SubscriptonPageObject.MONTHLY_SESSIONS_AND_PRICE, price.toString())
  }

  async verifyCurrentPaymentTotal(price: number): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.CURRENT_PAYMENT_TOTAL, price.toString())
  }

  async verifyProtocolType(protocolType: string|RegExp): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.PROTOCOL_TYPE, protocolType)
  }

  async verifyProtocolPrice(protocolPrice: string|RegExp): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.PROTOCOL_PRICE, protocolPrice)
  }

  async verifyModifiedSessions(countOfModifiedSessions: number, modificationType: ModificationType): Promise<void> {
    if(modificationType === ModificationType.ADD){
      await webActions.verifyElementContainsText(SubscriptonPageObject.SUBSCRIPTION_CARD, `+${countOfModifiedSessions.toString()}`)
    }else{
      await webActions.verifyElementContainsText(SubscriptonPageObject.SUBSCRIPTION_CARD, `-${countOfModifiedSessions.toString()}`)

    }
  }

  async addSessionsToSubsccription(countOfSessions: number): Promise<void> {
    await webActions.clickElement(SubscriptonPageObject.PLUS_SESIONS, countOfSessions)
    await this.page.waitForTimeout(3000);
  } 

  async removeSessionsFromSubsccription(countOfSessions: number): Promise<void> {
    await webActions.clickElement(SubscriptonPageObject.MINUS_SESIONS, countOfSessions)
  } 
}