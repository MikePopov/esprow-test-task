import { WebActions } from "@lib/WebActions";
import { AddExchangePopupObjects } from "@objects/AddExchangePopupObjeccts";
import { expect, Page } from "@playwright/test";
import { Exchange } from "../../lib/types";

let webActions: WebActions;

export class AddExchangePopup extends AddExchangePopupObjects{
  readonly page: Page

  constructor(page: Page){
    super();
    this.page = page;
    webActions = new WebActions(this.page);
  }

  async selectProtocolType(protocol: RegExp): Promise<void> {
    await webActions.selectOptionFromDropdown(AddExchangePopupObjects.PROTOCOL_TYPE_DROPDOWN, protocol)
  }

  async clickPlusSession(numberOfsessions: number): Promise<void> {
    await webActions.clickElement(AddExchangePopupObjects.PLUS_SESSION_BTN, numberOfsessions);
  }

  async clickAdd(): Promise<void> {
    await webActions.clickElement(AddExchangePopupObjects.ADD_BTN);
  }

  async addExchange(exchange: Exchange): Promise<void> {
    await this.selectProtocolType(exchange.protocolType);
    await webActions.verifyElementContainsText(AddExchangePopupObjects.PROTOCOL_COST, exchange.protocolCost.toString())
    const sessionCost = exchange.sessionCost * exchange.numberOfSessions;
    await this.clickPlusSession(exchange.numberOfSessions);
    await webActions.verifyElementText(AddExchangePopupObjects.NUMBER_OF_SESSIONS, exchange.numberOfSessions.toString())
    await webActions.verifyElementContainsText(AddExchangePopupObjects.SESSION_COST, sessionCost.toString());
    const totalCost = exchange.protocolCost+sessionCost;
    await webActions.verifyElementContainsText(AddExchangePopupObjects.TOTAL_COST, totalCost.toString());
    await this.clickAdd();
  }

  async verifyCosts(): Promise<void> {

  }
}