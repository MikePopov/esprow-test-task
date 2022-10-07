import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SubscriptonPage } from '@pages/SubscriptionPage';
import { AddExchangePopup } from '@pages/AddExchangePopup';

const test = baseTest.extend<{
  loginPage: LoginPage;
  subscriptionPage: SubscriptonPage;
  addExchangePopup: AddExchangePopup
}>({
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page))
  },
  subscriptionPage: async ({page}, use) => {
    await use(new SubscriptonPage(page))
  },
  addExchangePopup: async ({page}, use) => {
    await use(new AddExchangePopup(page))
  }
})

export default test;