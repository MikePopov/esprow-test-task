import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SubscriptonPage } from '@pages/SubscriptionPage';
import { AddExchangePopup } from '@pages/AddExchangePopup';
import { CartPage } from '../pageFactory/pageRepository/CartPage';
import { CheckoutPage } from '../pageFactory/pageRepository/CheckoutPage';
import { SuccessSubcriptionPopup } from '../pageFactory/pageRepository/SuccessSubscriptionPopup';
import { MainMenu } from '../pageFactory/pageRepository/MainMenu';

const test = baseTest.extend<{
  loginPage: LoginPage;
  subscriptionPage: SubscriptonPage;
  addExchangePopup: AddExchangePopup;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  successSubscriptionPopup: SuccessSubcriptionPopup;
  mainMenu: MainMenu;
}>({
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page))
  },
  subscriptionPage: async ({page}, use) => {
    await use(new SubscriptonPage(page))
  },
  addExchangePopup: async ({page}, use) => {
    await use(new AddExchangePopup(page))
  },
  cartPage: async ({page}, use) => {
    await use(new CartPage(page))
  },
  checkoutPage: async ({page}, use) => {
    await use(new CheckoutPage(page))
  },
  successSubscriptionPopup: async({page}, use) => {
    await use(new SuccessSubcriptionPopup(page))
  },
  mainMenu: async({page}, use) => {
    await use(new MainMenu(page))
  }
})

export default test;