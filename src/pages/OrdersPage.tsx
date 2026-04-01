import React, { useEffect } from "react";
import { useOrdersStore } from "../store/orders.store";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";
import columns from "../features/orderslist/columnHelper";
import OrderBookIcon from "../assets/OrderBookGroup.svg";
import { ArrowDownUp, Search, MoveUp, MoveDown } from "lucide-react";
import Pagination from "../shared/components/Pagination";

export default function OrdersPage() {
    const list = useOrdersStore((s) => s.list);
    const ordersList = useOrdersStore((s) => s.ordersList);

    const [sorting, setSorting] = React.useState<SortingState>([]);

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 20,
    });

    useEffect(() => {
        ordersList({ filterOn: [], sortOn: [] });
    }, [ordersList]);

    const table = useReactTable({
        data: list,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
            sorting,
        },
    });

    if (list.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center text-center h-64">
                {/* FIX: Use an img tag for file paths */}
                <img src={OrderBookIcon} alt="No orders" className="w-32 h-32" />
                <h3 className="font-medium text-lg">
                    You haven’t placed any order yet
                </h3>
                <p className="font-normal text-md">
                    You can place order via search or watchlist
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col m-4">
            <div className=" border border-[#E3E4E5] rounded-sm ">
                <div className="overflow-auto no-scrollbar ">
                    <table className="w-full border-separate border-spacing-0 ">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="h-4">
                                    {headerGroup.headers.map((header, index) => (
                                        <th
                                            key={header.id}
                                            className={`bg-[#ECEDEE] p-3 text-sm font-inter font-medium h-11 text-[#2A2A2B] border-r border-[#E3E4E5] py-2 sticky top-0 z-10
                                        ${index === 0 ? "min-w-[300px] left-0 z-20 " : "min-w-[170px]"}`}
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <span>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )}
                                                </span>
                                                <div className="flex flex-row gap-3">
                                                    {header.column.id === "scripName" ||
                                                        header.column.id === "nestOrderNumber" ? (
                                                        <Search className="ml-2 h-4 w-4 text-[#555555]" />
                                                    ) : (
                                                        <div
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            title={
                                                                header.column.getCanSort()
                                                                    ? header.column.getNextSortingOrder() ===
                                                                        "asc"
                                                                        ? "Sort ascending"
                                                                        : header.column.getNextSortingOrder() ===
                                                                            "desc"
                                                                            ? "Sort descending"
                                                                            : "Clear sort"
                                                                    : undefined
                                                            }
                                                        >
                                                            {{
                                                                asc: (
                                                                    <MoveUp className="ml-2 h-4 w-4 text-[#555555]" />
                                                                ),
                                                                desc: (
                                                                    <MoveDown className="ml-2 h-4 w-4 text-[#555555]" />
                                                                ),
                                                                // none: (
                                                                //     <ArrowDownUp className="ml-2 h-4 w-4 text-[#555555]" />
                                                                // ),
                                                            }[header.column.getIsSorted() as string] ?? (
                                                                    <ArrowDownUp className="ml-2 h-4 w-4 text-[#555555]" />
                                                                )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
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
                                            className={`h-11 p-3 text-sm font-inter font-normal text-[#2A2A2B]
                                    py-2 ${index === 0 ? "sticky left-0 z-20" : ""}
                                    ${row.index % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"}
                                `}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination table={table} />
        </div>
    );
}
