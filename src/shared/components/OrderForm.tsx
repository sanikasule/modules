import React, { useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import type {
  Exchange,
  OrderType,
  ProductType,
  Side,
} from "../../types/orders.types";

interface OrderFormProps {
  onClose: () => void;
}

const ORDER_TYPES: OrderType[] = ["Market", "Limit", "SL", "SL-M"];
const PRODUCT_TYPES: ProductType[] = ["NRML", "CNC", "MIS"];

const AVAILABLE_MARGIN = 34.7;
const MARGIN_PERCENT = 0.256;

const OrderForm: React.FC<OrderFormProps> = ({onClose}) => {
  const [exchange, setExchange] = useState<Exchange>("NSE");
  const [side, setSide] = useState<Side>("BUY");

  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(50);

  const [orderType, setOrderType] =
    useState<OrderType>("Market");

  const [productType, setProductType] =
    useState<ProductType>("NRML");

  /* ---------- CALCULATIONS ---------- */

  const requiredMargin = useMemo(
    () => quantity * price * MARGIN_PERCENT,
    [quantity, price]
  );

  const insufficient = requiredMargin > AVAILABLE_MARGIN;

  const handleOrderSubmit = () => {
    onClose();
  }

  /* ---------- HANDLERS ---------- */

  const resetForm = () => {
    setExchange("NSE");
    setSide("BUY");
    setQuantity(1);
    setPrice(50);
    setOrderType("Market");
    setProductType("NRML");
  };

  /* ---------- UI ---------- */

  return (
    <div className="w-[420px] rounded-lg border bg-white p-4 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold tracking-wide">
            RELIANCE
          </h3>

          <div className="flex gap-4 text-sm mt-1">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                checked={exchange === "NSE"}
                onChange={() => setExchange("NSE")}
              />
              NSE:
              <span className="text-green-600">
                1,415.94
              </span>
            </label>

            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                checked={exchange === "BSE"}
                onChange={() => setExchange("BSE")}
              />
              BSE:
              <span className="text-green-600">
                1,413.63
              </span>
            </label>
          </div>
        </div>

        {/* BUY SELL */}
        <div className="flex border rounded-md overflow-hidden">
          <button
            onClick={() => setSide("BUY")}
            className={`px-4 py-1 text-sm font-medium ${
              side === "BUY"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Buy
          </button>

          <button
            onClick={() => setSide("SELL")}
            className={`px-4 py-1 text-sm font-medium ${
              side === "SELL"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        {/* Quantity */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Quantity
          </label>

          <div className="flex border rounded-md overflow-hidden">
            <button
              className="px-3 bg-gray-100"
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
            >
              −
            </button>

            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(1, Number(e.target.value))
                )
              }
              className="w-full text-center outline-none"
            />

            <button
              className="px-3 bg-gray-100"
              onClick={() =>
                setQuantity((q) => q + 1)
              }
            >
              +
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Price
          </label>

          <input
            type="number"
            disabled={orderType === "Market"}
            value={price}
            onChange={(e) =>
              setPrice(Number(e.target.value))
            }
            className="
              border rounded-md px-3 py-2 text-sm
              disabled:bg-gray-100 disabled:text-gray-400
              focus:ring-2 focus:ring-blue-500 outline-none
            "
          />
        </div>

        <Dropdown
          label="Order type"
          value={orderType}
          options={ORDER_TYPES.map((o) => ({
            label: o,
            value: o,
          }))}
          onChange={setOrderType}
        />

        <Dropdown
          label="Product type"
          value={productType}
          options={PRODUCT_TYPES.map((p) => ({
            label: p,
            value: p,
          }))}
          onChange={setProductType}
        />
      </div>

      {/* MARGIN */}
      <div className="flex justify-between text-sm mt-5">
        <div>
          Required
          <span className="font-semibold ml-1">
            ₹ {requiredMargin.toFixed(2)}
          </span>
        </div>

        <div>
          Avai. Margin
          <span className="font-semibold ml-1">
            ₹ {AVAILABLE_MARGIN.toFixed(2)}
          </span>
        </div>
      </div>

      {insufficient && (
        <p className="text-red-500 text-xs mt-1">
          Insufficient margin
        </p>
      )}

      {/* ACTIONS */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={onClose}
          className="text-blue-600 text-sm"
        >
          Cancel
        </button>

        <button
          disabled={insufficient}
          onClick={onClose}
          className={`
            px-5 py-2 rounded-md text-white text-sm font-medium
            ${
              side === "BUY"
                ? "bg-green-600 disabled:bg-green-300"
                : "bg-red-500 disabled:bg-red-300"
            }
          `}
        >
          {side === "BUY" ? "Buy" : "Sell"}
        </button>
      </div>
    </div>
  );
};

export default OrderForm;