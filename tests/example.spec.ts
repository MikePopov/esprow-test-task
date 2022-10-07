import test from '@lib/BaseTest';

test('', async ({ loginPage, subscriptionPage }) => {
  await loginPage.navigateToURL();
  await loginPage.loginToApplication();
  await subscriptionPage.verifyAddExchangeButton();
})
