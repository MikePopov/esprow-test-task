import test from '@lib/BaseTest';

test('Add new exchange', async ({ subscriptionPage, addExchangePopup }) => {
  await subscriptionPage.navigateToURL();
  await subscriptionPage.clickOnAddExchange();
  await addExchangePopup.selectProtocolType(/FIX 4.2/);
  await addExchangePopup.clickPlusSession();
  await addExchangePopup.clickAdd();
})
