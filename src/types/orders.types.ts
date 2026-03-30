export type Exchange = "NSE" | "BSE";
export type Side = "BUY" | "SELL";

export type OrderType = "Market" | "Limit" | "SL" | "SL-M";
export type ProductType = "NRML" | "CNC" | "MIS";

export interface DropdownOption<T> {
  label: string;
  value: T;
}