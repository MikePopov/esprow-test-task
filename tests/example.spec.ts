import test from '@lib/BaseTest';
import { Exchange } from '../lib/types';

test('Add new exchange', async ({ subscriptionPage, addExchangePopup, 
  cartPage, checkoutPage, successSubscriptionPopup }) => {
  const exchangeData: Exchange = {
    protocolType: /FIX 4.2/,
    protocolCost: 50,
    numberOfSessions: 1,
    sessionCost: 10,
  }

  await subscriptionPage.navigateToURL();
  await subscriptionPage.clickOnAddExchange();
  await addExchangePopup.addExchange(exchangeData);
  await subscriptionPage.verifyExchange();
  await subscriptionPage.clickOnPay();
  await cartPage.clickOnProceedCheckout();
  await checkoutPage.clickOnPayAndSubscribe();
  await successSubscriptionPopup.clickOnGoToExchanges();
})
