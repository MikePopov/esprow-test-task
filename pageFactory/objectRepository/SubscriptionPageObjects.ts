export class SubscriptonPageObject{
  protected static ADD_EXCHAGE_BTN = `[class="sc-AykKE guaEXt subscription-add-exchange-button"]`;
  protected static SUBSCRIPTION_CARD = `[class="sc-LzLvb hShBUW"]`;
  protected static PROTOCOL_TYPE = `${this.SUBSCRIPTION_CARD} >> [class="sc-AykKC fzTngT"] >> nth=1`;
  protected static PROTOCOL_PRICE = `${this.SUBSCRIPTION_CARD} >> [class="sc-AykKC fzTngT"] >> nth=2`;
  protected static PLUS_SESIONS = `${this.SUBSCRIPTION_CARD} >> [class="sc-LzLwq WefCk"] >> nth=1`;
  protected static MINUS_SESIONS = `${this.SUBSCRIPTION_CARD} >> [class="sc-LzLwq WefCk"] >> nth=0`;
  protected static COUNT_OF_SESIONS = `${this.SUBSCRIPTION_CARD} >> [class="sc-LzLwr iFBxMS"]`;
  protected static ADDED_SESSIONS = `${this.SUBSCRIPTION_CARD} >> p`
  protected static CURRENT_PAYMENT = `[class="sc-LzLvh iyCOPv"]`;
  protected static PAY_BTN = `[class="sc-AykKE guaEXt subscription-confirm-button"]`;
  protected static HELP_MENU = `[class="sc-fzXfQV cAXUcw"]`;
  protected static EXCHANGE_STATUS_PAID = `${this.SUBSCRIPTION_CARD} >> [class="sc-LzLwn bybUyr"]`;
  protected static EXCHANGE_STATUS_UNPAID = `${this.SUBSCRIPTION_CARD} >> [class="sc-LzLwn iFJsqG"]`;
}