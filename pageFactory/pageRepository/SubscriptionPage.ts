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

  async verifyConfirmBtnText(): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.PAY_BTN, 'Confirm')
  }
  
  async navigateToURL(): Promise<void> {
    await webActions.navigateToUrl('/app/subscription');
  }

  async verifyExchange(isPaid: boolean): Promise<void> {
    await webActions.verifyElementIsDisplayed(SubscriptonPageObject.SUBSCRIPTION_CARD, 'Exchange not created');
    if(isPaid === true){
      await webActions.verifyElementContainsText(SubscriptonPageObject.EXCHANGE_STATUS_PAID, 'Paid')
    } else {
      await webActions.verifyElementContainsText(SubscriptonPageObject.EXCHANGE_STATUS_UNPAID, 'Unpaid')
    }
  }

  async verifyExchangeData(exchange: Exchange): Promise<void> {
    this.verifyProtocolType(exchange.protocolType)
    this.verifyProtocolPrice(exchange.protocolCost.toString())
    const sessionCost = exchange.numberOfSessions*exchange.sessionCost
    const currentPayment = exchange.protocolCost+sessionCost;
    this.verifySessionsCount(exchange.numberOfSessions)
    this.verifyCurrentPayment(currentPayment.toString());
  }

  async verifyCurrentPayment(payment: string|RegExp): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.CURRENT_PAYMENT, payment)
  }

  async verifySessionsCount(countOfSessions: number): Promise<void> {
    await webActions.verifyElementContainsText(SubscriptonPageObject.COUNT_OF_SESIONS, countOfSessions.toString())
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
  } 

  async removeSessionsFromSubsccription(countOfSessions: number): Promise<void> {
    await webActions.clickElement(SubscriptonPageObject.MINUS_SESIONS, countOfSessions)
  } 
}