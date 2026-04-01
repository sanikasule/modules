import { type ColumnDef } from "@tanstack/react-table";
import type { OrdersListItem } from "../../types/orders.types";

const columns: ColumnDef<OrdersListItem>[] = [
    {
        header: "Scrips",
        accessorKey: "scripName",
        sortDescFirst: false,
    },
    {
        header: "Exchange",
        accessorKey: "exchange",
        sortDescFirst: false,
    },
    {
        header: "Transaction",
        accessorKey: "transactionType",
        sortDescFirst: false,
        cell: (info) => {
            const status = info.getValue() as string;
            const isSell = status?.toLowerCase() === "sell";
            return (
                <p
                    className={
                        isSell
                            ? "w-11 px-2 bg-[#FAEBE9] rounded-sm text-[#CA3521] font-medium text-xs"
                            : "w-16 px-2 bg-[#E8F2EE] text-[#198055] rounded-sm font-medium text-xs"
                    }
                >
                    {isSell ? "SOLD" : "BOUGHT"}
                </p>
            );
        },
    },
    {
        header: "Product Type",
        accessorKey: "productCode",
        sortDescFirst: false,
    },
    {
        header: "Order Type",
        accessorKey: "orderPriceType",
        sortDescFirst: false,
    },
    {
        header: "Qty",
        accessorKey: "totalQuantity",
        sortDescFirst: false,
    },
    {
        header: "Price",
        accessorKey: "price",
        sortDescFirst: false,
        cell: (info) => (info.getValue() as number)?.toFixed(2),
    },
    // {
    //     header: "Trigger Price",
    //     accessorKey: "triggerPrice",
    //     cell: (info) => (info.getValue() as number)?.toFixed(2),
    // },
    // {
    //     header: "Trigger ID",
    //     accessorKey: "gtcGtdTriggerId",
    //     cell: (info) => {
    //         const triggerID = info.getValue() as string;
    //         const isNull = triggerID.length === 0;
    //         return <p>{isNull ? "--" : triggerID}</p>;
    //     },
    // },
    // {
    //     header: "Order Status",
    //     accessorKey: "bffOrderStatus",
    //     cell: (info) => {
    //         const status = info.getValue() as string;
    //         const isRejected = status?.toLowerCase() === "rejected";
    //         return (
    //             <p
    //                 className={
    //                     isRejected
    //                         ? "w-16 px-2 bg-red-100 rounded-sm text-red-700 font-medium text-xs"
    //                         : "w-16 px-2 bg-green-100 text-green-700 font-medium text-xs"
    //                 }
    //             >
    //                 {status}
    //             </p>
    //         );
    //     },
    // },
    // {
    //     header: "Nest Update Time",
    //     accessorKey: "orderedTime",
    // },
    {
        header: "Transaction ID",
        accessorKey: "nestOrderNumber",
        sortDescFirst: false,
    },
    {
        header: "Date & Time",
        accessorKey: "orderedTime",
        sortDescFirst: false,
    },
];

export default columns;
