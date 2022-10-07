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

  async clickElement(locator: string): Promise<void> {
    await this.page.click(locator);
  }

  async verifyElementText(locator: string, text: string): Promise<void> {
    const textValue = await this.page.textContent(locator);
    expect(textValue.trim()).toBe(text);
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