/* tslint:disable */
export interface PaymentSettingsDTO {
  amount?: number;
  currency?: string;
  id?: number;
  intent?: string;
  isPaymentEnabled?: boolean;
  noteToPayer?: string;
  paymentGatewayCredentials?: string;
  paymentGatewayProvider?: string;
  paymentMethod?: string;
}
