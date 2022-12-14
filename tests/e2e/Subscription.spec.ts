import test from '@lib/BaseTest';
import { ModificationType } from '../../lib/enums';
import { Exchange } from '../../lib/types';
import { testConfig } from '../../testconfig';

const subscriptionData: Exchange = {
  protocolType: /FIX 4.2/,
  protocolCost: 50,
  numberOfSessions: 1,
  sessionCost: 10,
}


test.describe('Subscription', () => {
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
  })

  test('Create and pay subscription', async ({ subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu }) => {
    // * I click "Add exchange"
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData);
    // * I click "Pay button"
    await subscriptionPage.clickOnPay();
    // * I see "Order"
    // * I click "Proceed To Checkout"
    await cartPage.clickOnProceedCheckout();
    // * I see "Complete my order"
    // * I click "Agree with terms"
    // * I click "Pay"
    await checkoutPage.clickOnPayAndSubscribe();
    // * I see "Successful subscription"
    // * I click "Go to exchanges"
    await successSubscriptionPopup.clickOnGoToExchanges();
    // * I see "Exchange page"
    // * I open page "Subscription"
    await mainMenu.openSubscriptionPage();
    // * I see "Subscription card" with "PAID"
    await subscriptionPage.verifySubscription(true);
  })

  test('Verify Subscription card data', async ({ subscriptionPage, addExchangePopup }) => {
  // 1. I click "Add exchange"
  await subscriptionPage.clickOnAddExchange();
  //   * I see "Add new exchange popup"
  await addExchangePopup.addExchange(subscriptionData);
  // 2. I see "Subscription card":
  //   * I see text "UNPAID"
  await subscriptionPage.verifySubscription(false);
  await subscriptionPage.verifySubscriptionData(subscriptionData)
  })

  test('Verify Monthly Subscription data', async ({ subscriptionPage, addExchangePopup }) => {
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData);
     // 3. I see "Monthly Subscription section"
    //   * I see "Total cost" 
    const monthlyTotal = subscriptionData.protocolCost+subscriptionData.sessionCost;
    await subscriptionPage.verifyMonthlyTotalSubscription(monthlyTotal)
    //   * I see "Type of Protocol"
    //   * I see "Protocol price" 
    await subscriptionPage.verifyMonthlyProtocolTypeAndPrice(subscriptionData.protocolType, subscriptionData.protocolCost)
    //   * I see "Number of sessions" with "1"
    //   * I see "Cost of sessions" with "10$"
    await subscriptionPage.verifyMonthlyNumberOfSessionsAndPrice(subscriptionData.numberOfSessions, subscriptionData.sessionCost)

  })

  test('Verify Current payment data', async ({ subscriptionPage, addExchangePopup }) => {
    // 1. I click "Add exchange"
    await subscriptionPage.clickOnAddExchange();
    //   * I see "Add new exchange popup"
    await addExchangePopup.addExchange(subscriptionData);
       // 4. I see "Current Subscription section"
    const currentPayment = subscriptionData.protocolCost+subscriptionData.sessionCost
    await subscriptionPage.verifyCurrentPaymentTotal(currentPayment);
  // 5. I see "Pay button" with "60$"
    await subscriptionPage.verifyConfirmBtnText(`Pay ${currentPayment}`)
  })

  test.skip('Verify pay Subscription data', async ({subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu}) => {
    await subscriptionPage.navigateToURL();
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData);
    // 1. I click "Pay"
    await subscriptionPage.clickOnPay();
    // 2. I see "Your pay"
    await cartPage.verifyData(subscriptionData)
    // 9. I click "Proceed to checkout"
    await cartPage.clickOnProceedCheckout();
    // 10. I see "Complete your order"
    await checkoutPage.verifyData(subscriptionData)
    // 19. I click "Pay &amp; Subscribe"
    await checkoutPage.clickOnPayAndSubscribe();
    await successSubscriptionPopup.clickOnGoToExchanges();
    // * I see "Exchange page"
    // * I open page "Subscription"
    await mainMenu.openSubscriptionPage();
    // * I see "Subscription card" with "PAID"
    await subscriptionPage.verifySubscription(true);
  })

  test('Add new one Subscription to existed subscriptions list and pay', async ({ subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu }) => {
    
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData);
    await subscriptionPage.clickOnPay();
    await cartPage.clickOnProceedCheckout();
    await checkoutPage.clickOnPayAndSubscribe();
    await successSubscriptionPopup.clickOnGoToExchanges();
    await mainMenu.openSubscriptionPage();
    await subscriptionPage.verifySubscription(true);

    const subscriptionData2: Exchange = {
      protocolType: /FIX 4.3/,
      protocolCost: 50,
      numberOfSessions: 1,
      sessionCost: 10,
    }
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData2);
    await subscriptionPage.clickOnPay();
    await cartPage.clickOnProceedCheckout();
    await checkoutPage.clickOnPayAndSubscribe();
    await successSubscriptionPopup.clickOnGoToExchanges();
    await mainMenu.openSubscriptionPage();
    await subscriptionPage.verifySubscriptionsCount(2);
  })

  test('Add sessions to PAID subscription', async ({ subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu }) => {
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData);
    await subscriptionPage.clickOnPay();
    await cartPage.clickOnProceedCheckout();
    await checkoutPage.clickOnPayAndSubscribe();
    await successSubscriptionPopup.clickOnGoToExchanges();
    await mainMenu.openSubscriptionPage();
    await subscriptionPage.verifyConfirmBtnText('Confirm');
  
    const countOfAddedSessions = 2;
    const countOfSessions = subscriptionData.numberOfSessions+countOfAddedSessions;
    const monthlyTotal = subscriptionData.protocolCost+(subscriptionData.sessionCost*countOfSessions);
    await subscriptionPage.addSessionsToSubsccription(countOfAddedSessions);
    await subscriptionPage.verifyModifiedSessions(countOfAddedSessions, ModificationType.ADD);
    await subscriptionPage.verifyMonthlyTotalSubscription(monthlyTotal);
  })

  test('Decrease sessions from PAID subscription', async ({ subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu, attentionPopup }) => {
    const subscriptionData2: Exchange = {
      protocolType: /FIX 4.2/,
      protocolCost: 50,
      numberOfSessions: 4,
      sessionCost: 10,
    }    
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData2);
    await subscriptionPage.clickOnPay();
    await cartPage.clickOnProceedCheckout();
    await checkoutPage.clickOnPayAndSubscribe();
    await successSubscriptionPopup.clickOnGoToExchanges();
    await mainMenu.openSubscriptionPage();
    await subscriptionPage.verifyConfirmBtnText('Confirm');
  
    const countOfRemovedSessions = 2;
    const countOfSessions = subscriptionData2.numberOfSessions-countOfRemovedSessions
    await subscriptionPage.removeSessionsFromSubsccription(countOfRemovedSessions);
    await subscriptionPage.verifyModifiedSessions(countOfRemovedSessions, ModificationType.REMOVE);
    await subscriptionPage.verifyConfirmBtnText('Confirm');
    await subscriptionPage.clickOnPay();

    await attentionPopup.verifyRemoveSessions(subscriptionData2.numberOfSessions, countOfRemovedSessions)
    await attentionPopup.clickOnConfirm();

    await successSubscriptionPopup.verifyCountOfSessions(countOfSessions);
    await successSubscriptionPopup.clickOnGoToExchanges();

    await mainMenu.openSubscriptionPage();
    await subscriptionPage.verifySessionsCount(countOfSessions);
  })

  test('Modify UNPAID subscription', async ({ subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu }) => {
    const subscriptionData: Exchange = {
      protocolType: /FIX 4.2/,
      protocolCost: 50,
      numberOfSessions: 4,
      sessionCost: 10,
    }
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData);
  
    const countOfAddedSessions = 2;
    const countOfRemovedSessions = 3;
    await subscriptionPage.addSessionsToSubsccription(countOfAddedSessions);
    await subscriptionPage.verifyModifiedSessions(countOfAddedSessions, ModificationType.ADD);
    await subscriptionPage.removeSessionsFromSubsccription(countOfRemovedSessions+countOfAddedSessions);
    await subscriptionPage.verifyModifiedSessions(countOfRemovedSessions, ModificationType.REMOVE);
  })

  test('Delete UNPAID Subscription', async ({ subscriptionPage, addExchangePopup, 
    attentionPopup }) => {
    const subscriptionData: Exchange = {
      protocolType: /FIX 4.2/,
      protocolCost: 50,
      numberOfSessions: 4,
      sessionCost: 10,
    }
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData);
  
    await subscriptionPage.checkSubscriptionCard()
    await subscriptionPage.clickDelete();
    await subscriptionPage.verifySubscriptionCardPendingDeletion();
    await subscriptionPage.clickOnPay();
    await subscriptionPage.clickOnAddExchange();
    await attentionPopup.clickOnConfirm();
    await subscriptionPage.verifySubscriptionNotExist();
  })

  test('Delete PAID Subscrition', async ({ subscriptionPage, addExchangePopup, 
    cartPage, checkoutPage, successSubscriptionPopup, mainMenu, attentionPopup }) => {
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.addExchange(subscriptionData);
    await subscriptionPage.clickOnPay();
    await cartPage.clickOnProceedCheckout();
    await checkoutPage.clickOnPayAndSubscribe();
    await successSubscriptionPopup.clickOnGoToExchanges();
    await mainMenu.openSubscriptionPage();
    await subscriptionPage.verifyConfirmBtnText('Confirm');
  
    await subscriptionPage.checkSubscriptionCard()
    await subscriptionPage.clickDelete();
    await subscriptionPage.verifySubscriptionCardPendingDeletion();
    await subscriptionPage.clickOnPay();
    await attentionPopup.clickOnConfirm();
    await subscriptionPage.verifySubscriptionNotExist();
  })

  test('Interruption add Exchange', async ({ subscriptionPage, addExchangePopup }) => {
    const exchangeData: Exchange = {
      protocolType: /FIX 4.2/,
      protocolCost: 50,
      numberOfSessions: 1,
      sessionCost: 10,
    }
    
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.selectProtocolType(exchangeData.protocolType);
    await addExchangePopup.clickPlusSession(exchangeData.numberOfSessions);
    await addExchangePopup.clickCrossForClosePopup();
    await subscriptionPage.clickOnAddExchange();
    await addExchangePopup.verifyFieldAreEmpty();
  
    await addExchangePopup.clickCancelForClosePopup();
    await addExchangePopup.verifyFieldAreEmpty();
  })
  
})
