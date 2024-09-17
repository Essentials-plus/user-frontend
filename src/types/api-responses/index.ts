import { PaginationMeta } from "@/types/api-responses/pagination-meta";

export type ApiResponseSuccessBase<T, AdditionalInfo = {}> = {
  data: T;
  meta?: PaginationMeta;
  success: true;
} & AdditionalInfo;

interface Address {
  city?: any;
  country?: any;
  line1?: any;
  line2?: any;
  postal_code?: any;
  state?: any;
}

interface BillingDetails {
  address: Address;
  email?: any;
  name?: any;
  phone?: any;
}

interface Checks {
  address_line1_check?: any;
  address_postal_code_check?: any;
  cvc_check: string;
}

interface Networks {
  available: string[];
  preferred?: any;
}

interface ThreeDSecureUsage {
  supported: boolean;
}

interface Card {
  brand: string;
  checks: Checks;
  country: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  generated_from?: any;
  last4: string;
  networks: Networks;
  three_d_secure_usage: ThreeDSecureUsage;
  wallet?: any;
}

export interface PMDTYPE {
  id: string;
  object: string;
  billing_details: BillingDetails;
  card: Card;
  created: number;
  customer: string;
  livemode: boolean;
  metadata: any;
  type: string;
  sepa_debit?: {
    bank_code: string;
    branch_code: string;
    country: string;
    fingerprint: string;
    last4: string;
  };
}

// {
//   "id": "pm_1Pl6Z1LpSmU6gOZ7nTuvH1X4",
//   "object": "payment_method",
//   "allow_redisplay": "unspecified",
//   "billing_details": {
//       "address": {
//           "city": null,
//           "country": null,
//           "line1": null,
//           "line2": null,
//           "postal_code": null,
//           "state": null
//       },
//       "email": "macafaj208@alientex.com",
//       "name": "Jenny Rosen",
//       "phone": null
//   },
//   "created": 1723024431,
//   "customer": "cus_QcKDdQGafEm2K0",
//   "livemode": false,
//   "metadata": {},
//   "sepa_debit": {
//       "bank_code": "RABO",
//       "branch_code": "",
//       "country": "NL",
//       "fingerprint": "ZbZvfUVI6RFTdgrS",
//       "generated_from": {
//           "charge": null,
//           "setup_attempt": "setatt_1Pl6YyLpSmU6gOZ7NZ14rtuW"
//       },
//       "last4": "5264"
//   },
//   "type": "sepa_debit"
// }
