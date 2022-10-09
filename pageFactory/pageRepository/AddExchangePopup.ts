import { WebActions } from "@lib/WebActions";
import { AddExchangePopupObjects } from "@objects/AddExchangePopupObjects";
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

  async clickMinusSession(decreaseNumber: number): Promise<void> {
    await webActions.clickElement(AddExchangePopupObjects.MINUS_SESSION_BTN, decreaseNumber);
  }

  async clickAdd(): Promise<void> {
    await webActions.clickElement(AddExchangePopupObjects.ADD_BTN);
  }

  async clickCrossForClosePopup(): Promise<void> {
    await webActions.clickElement(AddExchangePopupObjects.CROSS_BTN);
  }

  async clickCancelForClosePopup(): Promise<void> {
    await webActions.clickElement(AddExchangePopupObjects.CANCEL_BTN);
  }

  async addExchange(exchange: Exchange): Promise<void> {
    await this.selectProtocolType(exchange.protocolType);
    this.verifyProtocolCost(exchange.protocolCost);
    const sessionCost = exchange.sessionCost * exchange.numberOfSessions;
    await this.clickPlusSession(exchange.numberOfSessions);
    this.verifyNumberOfSessions(exchange.numberOfSessions);
    this.verifySessionsCost(sessionCost);
    const totalCost = exchange.protocolCost+sessionCost;
    this.verifyTotalCost(totalCost);
    await this.clickAdd();
  }

  async verifyTotalCost(cost: number): Promise<void>{
    await webActions.verifyElementContainsText(AddExchangePopupObjects.TOTAL_COST, cost.toString());
  }

  async verifySessionsCost(cost: number): Promise<void>{
    await webActions.verifyElementContainsText(AddExchangePopupObjects.SESSION_COST, cost.toString());
  }

  async verifyNumberOfSessions(sessions: number): Promise<void>{
    await webActions.verifyElementText(AddExchangePopupObjects.NUMBER_OF_SESSIONS, sessions.toString())
  }

  async verifyProtocolCost(cost: number): Promise<void>{
    await webActions.verifyElementContainsText(AddExchangePopupObjects.PROTOCOL_COST, cost.toString())
  }

  async verifyFieldAreEmpty(): Promise<void> {
    await webActions.verifyElementAttribute(AddExchangePopupObjects.PROTOCOL_TYPE_DROPDOWN, 'value', null)
    await webActions.verifyElementText(AddExchangePopupObjects.TOTAL_COST, '0.0')
  }
}