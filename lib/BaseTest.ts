import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SubscriptonPage } from '@pages/SubscriptionPage';

const test = baseTest.extend<{
  loginPage: LoginPage;
  subscriptionPage: SubscriptonPage
}>({
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page))
  },
  subscriptionPage: async ({page}, use) => {
    await use(new SubscriptonPage(page))
  }
})

export default test;