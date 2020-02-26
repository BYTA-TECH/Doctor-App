/* tslint:disable */
export interface PaymentSettings {
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
