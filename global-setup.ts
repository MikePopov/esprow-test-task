import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "./pageFactory/pageRepository/LoginPage";
import { SubscriptonPage } from "./pageFactory/pageRepository/SubscriptionPage";

async function globalSetup(config: FullConfig): Promise<void> {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(`${baseURL}/auth/sign-in`);
  const loginPage = new LoginPage(page);
  const subscriptionPage = new SubscriptonPage(page);
  await loginPage.loginToApplication();
  await subscriptionPage.verifyAddExchangeButton();
  await page.context().storageState({ path: 'storage-state.json' });
  await browser.close();
}

export default globalSetup;