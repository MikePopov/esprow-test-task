export class SubscriptonPageObject{
  protected static ADD_EXCHAGE_BTN = `[class="sc-AykKE guaEXt subscription-add-exchange-button"]`;
  protected static EXCHANGE_CARD = `[class="sc-LzLvb hShBUW"]`;
  protected static PROTOCOL_TYPE = `${this.EXCHANGE_CARD} >> [class="sc-AykKC fzTngT"] >> nth=1`;
  protected static PROTOCOL_PRICE = `${this.EXCHANGE_CARD} >> [class="sc-AykKC fzTngT"] >> nth=2`;
  protected static CURRENT_PAYMENT = `[class="sc-LzLvh iyCOPv"]`;
  protected static PAY_BTN = `[class="sc-AykKE guaEXt subscription-confirm-button"]`;
  protected static HELP_MENU = `[class="sc-fzXfQV cAXUcw"]`;
  protected static EXCHANGE_STATUS_PAID = `${this.EXCHANGE_CARD} >> [class="sc-LzLwn bybUyr"]`;
  protected static EXCHANGE_STATUS_UNPAID = `${this.EXCHANGE_CARD} >> [class="sc-LzLwn iFJsqG"]`;
}