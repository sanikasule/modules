import React, { useEffect } from "react";
import { useOrdersStore } from "../store/orders.store";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import columns from "../features/orderslist/columnHelper";

export default function OrdersPage() {
    const list = useOrdersStore((s) => s.list);
    const ordersList = useOrdersStore((s) => s.ordersList);

    useEffect(() => {
        ordersList({ filterOn: [], sortOn: [] });
    }, [ordersList]);

    const table = useReactTable({
        data: list,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-2">
            <table className="w-full bg-gray-100 border-collapse border-t-2 border-b-2 border-gray-300 border-l-0 border-r-0">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="h-4">
                            {headerGroup.headers.map((header, index) => (
                                <th
                                    key={header.id}
                                    className={`px-4 font-bold
                                    border-r-2 border-r-gray-300 text-xs
                                        min-w-[150px]
                                        py-2 ${index === 0 ? "sticky left-0 z-20 bg-gray-100 shadow-[5px_5px_10px_rgba(0,0,0,0.3)]" : ""}`}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="h-4">
                            {row.getVisibleCells().map((cell, index) => (
                                <td
                                    key={cell.id}
                                    className={`px-4 border-t-2 border-t-blue-600 border-r-2 border-r-gray-300 text-xs
                                    py-2 ${index === 0 ? "sticky left-0 z-20 bg-gray-100 shadow-[5px_5px_10px_rgba(0,0,0,0.3)]" : ""}
                                `}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
