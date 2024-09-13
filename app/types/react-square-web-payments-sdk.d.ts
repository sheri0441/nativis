declare module "react-square-web-payments-sdk" {
  import * as React from "react";

  export interface PaymentFormProps {
    applicationId: string;
    locationId: string;
    cardTokenizeResponseReceived: (token: {
      status: string;
      token: string;
    }) => void;
    children?: React.ReactNode;
  }

  export const PaymentForm: React.FC<PaymentFormProps>;
  export const CreditCard: React.FC;
}
