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

  async verifyAddBtn(isActive: boolean): Promise<void> {
    if(isActive === false){
      await webActions.verifyElementAttribute(AddExchangePopupObjects.ADD_BTN, 'disabled', null)
    }
  }

  async clickCrossForClosePopup(): Promise<void> {
    await webActions.clickElement(AddExchangePopupObjects.CROSS_BTN);
  }

  async clickCancelForClosePopup(): Promise<void> {
    await webActions.clickElement(AddExchangePopupObjects.CANCEL_BTN);
  }

  async addExchange(exchange: Exchange): Promise<void> {
    //   * I select "Protocol Type" 
    await this.selectProtocolType(exchange.protocolType);
    //   * I see "Protocol cost"
    await this.verifyProtocolCost(exchange.protocolCost);
    //   * I see "Total cost" with "50$"
    await this.verifyTotalCost(exchange.protocolCost);
    //   * I click "Plus number of sessions"
    await this.clickPlusSession(exchange.numberOfSessions);
    //   * I see "Numer of sessions" 
    await this.verifyNumberOfSessions(exchange.numberOfSessions);
    //   * I see "Session cost" 
    const sessionCost = exchange.sessionCost * exchange.numberOfSessions;
    await this.verifySessionsCost(sessionCost);
    //   * I see "Total cost" with "60"
    const totalCost = exchange.protocolCost+sessionCost;
    await this.verifyTotalCost(totalCost);
    //   * I click "Add"
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