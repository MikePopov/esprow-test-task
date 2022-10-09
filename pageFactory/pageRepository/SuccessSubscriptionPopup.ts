import { WebActions } from "@lib/WebActions";
import { Page } from "@playwright/test";
import { Exchange } from "@lib/types";

import { SuccessSubcriptionPopupObjects } from "../objectRepository/SuccessSubscriptionPopupObjects";

let webActions: WebActions;

export class SuccessSubcriptionPopup extends SuccessSubcriptionPopupObjects{
  readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

  async clickOnGoToExchanges() {
    await webActions.clickElement(SuccessSubcriptionPopupObjects.GO_TO_EXVHANGES_BTN);
  }
}