import test from '@lib/BaseTest';
import { Exchange } from '../lib/types';

test('Add new exchange', async ({ subscriptionPage, addExchangePopup }) => {
  const exchangeData: Exchange = {
    protocolType: /FIX 4.2/,
    protocolCost: 50,
    numberOfSessions: 3,
    sessionCost: 10,
  }

  await subscriptionPage.navigateToURL();
  await subscriptionPage.clickOnAddExchange();
  await addExchangePopup.addExchange(exchangeData);
})
