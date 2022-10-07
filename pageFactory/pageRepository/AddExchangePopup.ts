import { WebActions } from "@lib/WebActions";
import { AddExchangePopupObjects } from "@objects/AddExchangePopupObjeccts";
import { Page } from "@playwright/test";

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

  async clickPlusSession(): Promise<void> {
    await webActions.clickElement(AddExchangePopupObjects.PLUS_SESSION_BTN);
  }

  async clickAdd(): Promise<void> {
    await webActions.clickElement(AddExchangePopupObjects.ADD_BTN);
  }
}