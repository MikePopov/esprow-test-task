import test from '@lib/BaseTest';
import { ModificationType } from '../../lib/enums';
import { Exchange } from '../../lib/types';
import { testConfig } from '../../testconfig';



const exchangeData: Exchange = {
  protocolType: /FIX 4.2/,
  protocolCost: 50,
  numberOfSessions: 4,
  sessionCost: 10,
}

test.describe.only('Paided Subscription', () => {

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
    await addExchangePopup.addExchange(exchangeData);
    await subscriptionPage.verifyExchange(false);
    await subscriptionPage.clickOnPay();
    await cartPage.clickOnProceedCheckout();
    await checkoutPage.clickOnPayAndSubscribe();
    await successSubscriptionPopup.clickOnGoToExchanges();
    await mainMenu.openSubscriptionPage()
  })

  test('Add and pay session to paided Subscription', async ({ subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu }) => {
  
    const countOfAddedSessions = 2;
    const countOfSessions = exchangeData.numberOfSessions+countOfAddedSessions
    await subscriptionPage.addSessionsToSubsccription(countOfAddedSessions);
    await subscriptionPage.verifyModifiedSessions(countOfAddedSessions, ModificationType.ADD);
    await subscriptionPage.clickOnPay();
    await cartPage.clickOnProceedCheckout();
    await checkoutPage.clickOnPayAndSubscribe();
    await successSubscriptionPopup.verifyCountOfSessions(countOfSessions);
    await successSubscriptionPopup.clickOnGoToExchanges();
    await mainMenu.openSubscriptionPage();
    await subscriptionPage.verifySessionsCount(countOfSessions);
  })
  
  test('Remove sessions from paided Subscription', async ({ subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu, attentionPopup }) => {
  
    const countOfRemovedSessions = 2;
    const countOfSessions = exchangeData.numberOfSessions-countOfRemovedSessions
    await subscriptionPage.removeSessionsFromSubsccription(countOfRemovedSessions);
    await subscriptionPage.verifyModifiedSessions(countOfRemovedSessions, ModificationType.REMOVE);
    await subscriptionPage.verifyConfirmBtnText();
    await subscriptionPage.clickOnPay();

    await attentionPopup.verifyRemoveSessions(exchangeData.numberOfSessions, countOfRemovedSessions)
    await attentionPopup.clickOnConfirm();

    await successSubscriptionPopup.verifyCountOfSessions(countOfSessions);
    await successSubscriptionPopup.clickOnGoToExchanges();

    await mainMenu.openSubscriptionPage();
    await subscriptionPage.verifySessionsCount(countOfSessions);
  })
  
})




