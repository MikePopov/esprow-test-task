import { expect, Page } from "@playwright/test";
import { testConfig } from "../testconfig";
const waitForElement = testConfig.waitForElement;

export class WebActions{
  readonly page: Page

  constructor(page: Page){
    this.page = page;
  }

  async navigateToUrl(url: string) {
    await this.page.goto(url);
  }

  async enterElementText(locator: string, text: string): Promise<void> {
    await this.page.fill(locator, text);
  }

  async clickElement(locator: string, numberOfClicks?: number): Promise<void> {
    await this.page.click(locator, {clickCount: numberOfClicks});
  }

  async verifyElementText(locator: string, text: string|RegExp): Promise<void> {
    const textValue = await this.page.textContent(locator);
    expect(textValue.trim()).toBe(text);
  }

  async verifyElementContainsText(locator: string, text: string): Promise<void> {
    await expect(this.page.locator(locator)).toContainText(text);
}

  async selectOptionFromDropdown(locator: string, option: RegExp): Promise<void> {
    const selectDropDownLocator = await this.page.$(locator);
    selectDropDownLocator.click();
    const options = await this.page.locator(`[class="sc-LzLtM kjUByV"]`)
    await options.locator(':scope', { hasText: option }).click();
  }

  // async waitForPageNavigation(event: string): Promise<void> {
  //   switch (event.toLowerCase()) {
  //       case `networkidle`:
  //           await this.page.waitForNavigation({ waitUntil: `networkidle`, timeout: waitForElement });
  //           break;
  //       case `load`:
  //           await this.page.waitForNavigation({ waitUntil: `load`, timeout: waitForElement });
  //           break;
  //       case `domcontentloaded`:
  //           await this.page.waitForNavigation({ waitUntil: `domcontentloaded`, timeout: waitForElement });
  //   }
  // }
}