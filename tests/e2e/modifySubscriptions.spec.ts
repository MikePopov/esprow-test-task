import test from '@lib/BaseTest';
import { ModificationType } from '../../lib/enums';
import { Exchange } from '../../lib/types';
import { testConfig } from '../../testconfig';



const subscriptionData: Exchange = {
  protocolType: /FIX 4.2/,
  protocolCost: 50,
  numberOfSessions: 4,
  sessionCost: 10,
}

test.describe('Paided Subscription', () => {

  test.beforeEach(async ({ request, subscriptionPage, page, 
    addExchangePopup, cartPage, checkoutPage,
  successSubscriptionPopup, mainMenu }) => {
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

    await subscriptionPage.navigateToURL();
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData);
    await subscriptionPage.verifySubscription(false);
    await subscriptionPage.clickOnPay();
    await cartPage.clickOnProceedCheckout();
    await checkoutPage.clickOnPayAndSubscribe();
    await successSubscriptionPopup.clickOnGoToExchanges();
    await mainMenu.openSubscriptionPage()
  })

  
  

  test('verify costs after add Session to paided Subscription', async ({ subscriptionPage, mainMenu }) => {
    const countOfAddedSessions = 1;
    await subscriptionPage.addSessionsToSubsccription(countOfAddedSessions);
    await subscriptionPage.verifySessionPriceInSubscriptionCard(subscriptionData.sessionCost);
    await subscriptionPage.verifyCurrentPaymentInSubscriptionCard((subscriptionData.sessionCost*countOfAddedSessions).toString())
    const totalMonthlyPrice = subscriptionData.protocolCost+
    (subscriptionData.sessionCost*(subscriptionData.numberOfSessions+countOfAddedSessions));
    await subscriptionPage.verifyMonthlyTotalSubscription(totalMonthlyPrice);
    await subscriptionPage.verifyCurrentPaymentTotal(subscriptionData.sessionCost);
  })
  
})

test.describe('Unpaided Subscription', () => {
  test.beforeEach(async ({ request, subscriptionPage, page, 
    addExchangePopup, cartPage, checkoutPage,
  successSubscriptionPopup, mainMenu }) => {
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

    await subscriptionPage.navigateToURL();
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData);
    await subscriptionPage.verifySubscription(false);
  })

  test('Add sessions', async ({ subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu }) => {
  
    const countOfAddedSessions = 2;
    const countOfRemovedSessions = 3;
    await subscriptionPage.addSessionsToSubsccription(countOfAddedSessions);
    await subscriptionPage.verifyModifiedSessions(countOfAddedSessions, ModificationType.ADD);
  })

  test('Remove sessions', async ({ subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu }) => {
  
    const countOfAddedSessions = 2;
    const countOfRemovedSessions = 3;
    
    await subscriptionPage.removeSessionsFromSubsccription(countOfRemovedSessions);
    await subscriptionPage.verifyModifiedSessions(countOfRemovedSessions, ModificationType.REMOVE);
  })
}) 





