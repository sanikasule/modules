export type Exchange = "NSE" | "BSE";
export type Side = "BUY" | "SELL";

export type OrderType = "Market" | "Limit" | "SL" | "SL-M";
export type ProductType = "NRML" | "CNC" | "MIS";

export interface DropdownOption<T> {
  label: string;
  value: T;
}
export interface OrdersListItem {
  scripId: string;
  transactionType: string;
  exchangeSegment: string;
  exchange: string;
  tradingSymbol: string;
  nestOrderNumber: number;
  gtcGtdTriggerId: string | null;
  sipSequenceNumber: string | null;
  sipIndicator: string | null;
  gtcGtdIndicator: string;
  advOrderIndicator: string;
  price: number;
  triggerPrice: number;
  totalQuantity: number;
  scripName: string;
  orderStatus: string;
  bffOrderStatus: string;
  rejectionReason: string;
  scripToken: string;
  filledQuantity: number;
  pendingQuantity: number;
  productCode: string;
  averagePrice: number;
  decimalPrecision: number;
  exchangeOrderNumber: number;
  orderedTime: string;
  orderPriceType: string;
  orderAuthStatus: string;
  warningText: string | null;
  childOrders: [];
  lotSize: number;
  remarks: string | null;
  afterMarketOrderFlag: false;
  retentionType: string;
  segmentIndicator: string;
  isReplaceable: string;
  companyName: string;
  assetCode: string;
}

export interface OrdersListResponse {
  orders: OrdersListItem[];
  totalOrderCount: number;
}
