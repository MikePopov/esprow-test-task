export class CartPageObjects{
  protected static PROCEED_TO_CHECKOUT_BTN = `[class="cb-button__text"]`;
  protected static PROTOCOL_TYPE = `[class="cb-item__name  cb-item__sub-group--left"] >> nth=1`
  protected static SESSION = `[class="cb-item__name  cb-item__sub-group--left"] >> nth=2`
  protected static PRTOCOL_COST = `[class="cb-item__middle"] >> nth=0`
  protected static SESSION_COST = `[class="cb-item__middle"] >> nth=1`
  protected static PAY_NOW = `[class="cb-bar__aside"] >> nth=0`
  protected static NEXT_CHARGE = `[class="cb-bar__aside"] >> nth=1`
}