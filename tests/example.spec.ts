import test from '@lib/BaseTest';
import { Exchange } from '../lib/types';
import { testConfig } from '../testconfig';

// test.beforeEach(async ({ request, subscriptionPage, page }) => {
//   await subscriptionPage.navigateToURL();
//   const ls = await page.evaluate(() => {
//     return localStorage.getItem("ETP_GEMS_loginInfo");
//   });
//   // console.log(JSON.parse(ls).accessToken)
//     const requestBody = []
//   await request.post(`${testConfig.devApi}/api/v1/payments/prices`, 
//   { data: requestBody,
//     headers: {
//       Authorization: `BEARER ${JSON.parse(ls).accessToken}`
//     }
//    });

// })

test('Add and Subscribe new exchange', async ({ subscriptionPage, addExchangePopup, 
  cartPage, checkoutPage, successSubscriptionPopup, mainMenu }) => {
  const exchangeData: Exchange = {
    protocolType: /FIX 4.2/,
    protocolCost: 50,
    numberOfSessions: 1,
    sessionCost: 10,
  }

  await subscriptionPage.navigateToURL();
  await subscriptionPage.clickOnAddExchange();
  await addExchangePopup.addExchange(exchangeData);
  await subscriptionPage.verifyExchange(false);
  await subscriptionPage.clickOnPay();
  await cartPage.clickOnProceedCheckout();
  await checkoutPage.clickOnPayAndSubscribe();
  await successSubscriptionPopup.clickOnGoToExchanges();
  await mainMenu.openSubscriptionPage();
  await subscriptionPage.verifyExchange(true);
})

test.only('Interruption add Exchange', async ({ subscriptionPage, addExchangePopup, 
  cartPage, checkoutPage, successSubscriptionPopup, mainMenu }) => {
  const exchangeData: Exchange = {
    protocolType: /FIX 4.2/,
    protocolCost: 50,
    numberOfSessions: 1,
    sessionCost: 10,
  }

  await subscriptionPage.navigateToURL();
  await subscriptionPage.clickOnAddExchange();
  await addExchangePopup.selectProtocolType(exchangeData.protocolType);
  await addExchangePopup.clickPlusSession(exchangeData.numberOfSessions);
  await addExchangePopup.clickCrossForClosePopup();
  await subscriptionPage.clickOnAddExchange();
  await addExchangePopup.verifyFieldAreEmpty();
})

