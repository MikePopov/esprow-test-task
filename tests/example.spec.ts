import test from '@lib/BaseTest';

test('', async ({ loginPage, subscriptionPage }) => {
  await subscriptionPage.navigateToURL();
  await subscriptionPage.verifyAddExchangeButton();
})
