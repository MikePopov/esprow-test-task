export class AddExchangePopupObjects{
  protected static FORM = `[class="sc-fzXfQT jlJwWG"]`;
  protected static PROTOCOL_TYPE_DROPDOWN = `${this.FORM} >> [class="sc-LzLtL ffAAVg select"]`;
  protected static PLUS_SESSION_BTN = `${this.FORM} >> [class="sc-LzLwo iFciar"]`
  protected static MINUS_SESSION_BTN = `${this.FORM} >> [class="sc-LzLwp iFkEEA"]`
  protected static NUMBER_OF_SESSIONS = `${this.FORM} >> [class="sc-LzLws iFJUrb"]`
  protected static PROTOCOL_COST = `${this.FORM} >> [class="sc-AykKC izHnre"] >> nth=0`
  protected static SESSION_COST = `${this.FORM} >> [class="sc-AykKC izHnre"] >> nth=1`
  protected static TOTAL_COST = `${this.FORM} >> [class="sc-fzXfRa cIeZEc"] >> nth=1`
  protected static ADD_BTN = `[class="sc-AykKE dxdSCX subscription-add-button"]`;
  protected static CROSS_BTN = `[class="sc-fzXfQU cAPxyn"]`;
  protected static CANCEL_BTN = `[class="sc-AykKI csTBRd"]`;
}