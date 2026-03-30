import { createColumnHelper } from "@tanstack/react-table";
import type { OrdersListItem } from "../../types/orders.types";

const columnHelper = createColumnHelper<OrdersListItem>();

const columns = [
    columnHelper.accessor("tradingSymbol", {
        cell: (info) => info.getValue(),
        header: () => "Trading Symbol",
    }),
    columnHelper.accessor("exchangeSegment", {
        cell: (info) => info.getValue(),
        header: () => "Exchange Seq",
    }),
    columnHelper.accessor("transactionType", {
        cell: (info) => {
            const status = info.getValue();
            const isSell = status.toLowerCase() === "sell";

            return (
                <p
                    className={
                        isSell
                            ? "w-10 px-2 bg-red-100 rounded-sm text-red-700 font-medium text-xs"
                            : "w-10 px-2 bg-green-100 text-green-700 font-medium text-xs"
                    }
                >
                    {status}
                </p>
            );
        },
        header: () => "Buy/Sell",
    }),
    columnHelper.accessor("productCode", {
        cell: (info) => info.getValue(),
        header: () => "Product Type",
    }),
    columnHelper.accessor("orderPriceType", {
        cell: (info) => info.getValue(),
        header: () => "Order Type",
    }),
    columnHelper.accessor("totalQuantity", {
        cell: (info) => info.getValue(),
        header: () => "Total Quantity",
    }),
    columnHelper.accessor("price", {
        cell: (info) => info.renderValue()?.toFixed(2),
        header: () => "Price",
    }),
    columnHelper.accessor("triggerPrice", {
        cell: (info) => info.renderValue()?.toFixed(2),
        header: () => "Trigger Price",
    }),
    columnHelper.accessor("gtcGtdTriggerId", {
        cell: (info) => info.getValue(),
        header: () => "Trigger ID",
    }),
    columnHelper.accessor("bffOrderStatus", {
        cell: (info) => {
            const status = info.getValue();
            const isRejected = status.toLowerCase() === "rejected";

            return (
                <p
                    className={
                        isRejected
                            ? "w-16 px-2 bg-red-100 rounded-sm text-red-700 font-medium text-xs"
                            : "w-16 px-2 bg-green-100 text-green-700 font-medium text-xs"
                    }
                >
                    {status}
                </p>
            );
        },
        header: () => "Order Status",
    }),
    // columnHelper.accessor("rejectionReason", {
    //     cell: (info) => info.getValue(),
    //     header: () => "Rejection Reason",
    // }),
    columnHelper.accessor("orderedTime", {
        cell: (info) => info.getValue(),
        header: () => "Nest Update Time",
    }),
    columnHelper.accessor("nestOrderNumber", {
        cell: (info) => info.getValue(),
        header: () => "Nest Order No",
    }),
    columnHelper.accessor("orderedTime", {
        cell: (info) => info.getValue(),
        header: () => "Updated Time",
    }),
];

export default columns;
