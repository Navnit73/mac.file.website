import { QUICKBOOKS_BANK_GUIDE, QUICKBOOKS_CARD_GUIDE } from "./quickbooks";
import { NETSUITE_GUIDE, XERO_GUIDE } from "./xero-netsuite";
import { SAP_GUIDE, TALLY_GUIDE } from "./sap-tally";

export type { SoftwareGuide } from "./types";

export const SOFTWARE_GUIDES = [
  QUICKBOOKS_BANK_GUIDE,
  QUICKBOOKS_CARD_GUIDE,
  XERO_GUIDE,
  NETSUITE_GUIDE,
  SAP_GUIDE,
  TALLY_GUIDE,
] as const;
