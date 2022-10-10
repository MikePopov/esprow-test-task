import { WebActions } from "@lib/WebActions";
import { Page } from "@playwright/test";
import { Exchange } from "@lib/types";
import { CartPageObjects } from "../objectRepository/CartPageObjects";
import { AttentionPopupObject } from "../objectRepository/AttentionPopupObjects";

let webActions: WebActions;

export class AttentionPopup extends AttentionPopupObject{
  readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

  async clickOnConfirm() {
    await webActions.clickElement(AttentionPopupObject.CONFIRM_BTN);
  }

  async verifyRemoveSessions(from: number, to: number) {
    await webActions.verifyElementContainsText(AttentionPopupObject.WINDOW, `from ${from} to ${to}`);
  }
}