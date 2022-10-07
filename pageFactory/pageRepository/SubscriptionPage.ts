import { WebActions } from "@lib/WebActions";
import { SubscriptonPageObject } from "@objects/SubscriptionPageObjects";
import { Page } from "@playwright/test";

let webActions: WebActions;

export class SubscriptonPage extends SubscriptonPageObject{
  readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

  async verifyAddExchangeButton(): Promise<void> {
      await webActions.verifyElementText(SubscriptonPageObject.ADD_EXCHAGE_BTN, 'Add Exchange');
  }  
}