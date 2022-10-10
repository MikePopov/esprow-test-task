import test from '@lib/BaseTest';
import { Exchange } from '../lib/types';
import { testConfig } from '../testconfig';

test.afterEach(async ({ request, subscriptionPage, page }) => {
  await subscriptionPage.navigateToURL();
  const ls = await page.evaluate(() => {
    return localStorage.getItem("ETP_GEMS_loginInfo");
  });
  const accessToken = JSON.parse(ls).accessToken
    const requestBody = []
  await request.post(`${testConfig.devApi}/api/v1/payments/prices`, 
  { data: requestBody,
    headers: {
      Authorization: `BEARER ${accessToken}`
    }
  });
  
  const req2 = {
    "email": "test.qa.3@esprow.com",
    "redirectUrl": "https://spa-dev.etpmarkets.com:3000/app/subscription/subscription-info",
    "addonExchangesAudit": []
  }
  await request.post(`${testConfig.devApi}/api/v1/payments/checkout`, 
  { data: req2,
    headers: {
      Authorization: `BEARER ${accessToken}`
    }
  });

  await request.delete(`${testConfig.devApi}/api/v1/payments/abort`, 
    { headers: {
        Authorization: `BEARER ${accessToken}`
      }
    }
  );
})

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

test('Interruption add Exchange', async ({ subscriptionPage, addExchangePopup }) => {
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

  await addExchangePopup.clickCancelForClosePopup();
  await addExchangePopup.verifyFieldAreEmpty();
})

test('Decrease number of sessions', async ({ subscriptionPage, addExchangePopup }) => {
  const exchangeData: Exchange = {
    protocolType: /FIX 4.2/,
    protocolCost: 50,
    numberOfSessions: 4,
    sessionCost: 10,
  }

  await subscriptionPage.navigateToURL();
  await subscriptionPage.clickOnAddExchange();
  await addExchangePopup.selectProtocolType(exchangeData.protocolType);
  await addExchangePopup.clickPlusSession(exchangeData.numberOfSessions);
  const decreaseSessions = 2;
  await addExchangePopup.clickMinusSession(decreaseSessions);
  const sessions = exchangeData.numberOfSessions-decreaseSessions;
  await addExchangePopup.verifyNumberOfSessions(sessions);
  const sessionCost = exchangeData.sessionCost*sessions
  await addExchangePopup.verifySessionsCost(sessionCost);
  await addExchangePopup.verifyTotalCost(exchangeData.protocolCost + sessionCost);
})

test('Change protocol type', async ({ subscriptionPage, addExchangePopup }) => {
  const exchangeData: Exchange = {
    protocolType: /FIX 4.2/,
    protocolCost: 50,
    numberOfSessions: 1,
    sessionCost: 10,
  }

  await subscriptionPage.navigateToURL();
  await subscriptionPage.clickOnAddExchange();
  await addExchangePopup.selectProtocolType(exchangeData.protocolType);
  await addExchangePopup.selectProtocolType(/FIX 4.3/);
  await addExchangePopup.verifyProtocolCost(exchangeData.protocolCost);
  await addExchangePopup.verifyTotalCost(exchangeData.protocolCost);
 
})




