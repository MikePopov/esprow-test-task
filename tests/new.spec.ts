

// test('Remove session for paided Subscription', async ({ subscriptionPage, addExchangePopup, 
//   cartPage, checkoutPage, successSubscriptionPopup, mainMenu, attentionPopup }) => {
//   const exchangeData: Exchange = {
//     protocolType: /FIX 4.2/,
//     protocolCost: 50,
//     numberOfSessions: 4,
//     sessionCost: 10,
//   }

//   await subscriptionPage.navigateToURL();
//   await subscriptionPage.clickOnAddExchange();
//   await addExchangePopup.addExchange(exchangeData);
//   await subscriptionPage.verifyExchange(false);
//   await subscriptionPage.clickOnPay();
//   await cartPage.clickOnProceedCheckout();
//   await checkoutPage.clickOnPayAndSubscribe();
//   await successSubscriptionPopup.clickOnGoToExchanges();
//   await mainMenu.openSubscriptionPage();

//   await subscriptionPage.removeSessionsFromSubsccription(2);
//   await subscriptionPage.clickOnPay();
//   await attentionPopup.clickOnConfirm();
//   await mainMenu.openSubscriptionPage();
//   await subscriptionPage.verifyExchangeData()
// })




