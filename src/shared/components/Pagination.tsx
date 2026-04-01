import { type Table } from "@tanstack/react-table";

interface PaginationProps {
    table: Table<any>;
}

const Pagination = ({ table }: PaginationProps) => {
    return (
        <div className="mt-4 h-2">
            <div className="flex justify-center gap-2 sticky left-0">
                <button
                    className="border rounded p-1 cursor-pointer"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </button>
                <button
                    className="border rounded p-1 cursor-pointer"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<"}
                </button>
                <button
                    className="border rounded p-1 cursor-pointer"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">"}
                </button>
                <button
                    className="border rounded p-1 cursor-pointer"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">>"}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span className="flex items-center gap-2">
                    | Go to page:
                    <input
                        type="number"
                        min="1"
                        max={table.getPageCount()}
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex gap-1 items-center">
                {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
                    (pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`min-w-12.5 border rounded px-3 py-1 cursor-pointer ${table.getState().pagination.pageIndex === pageNumber
                                    ? "bg-[#2A2A2B] text-white"
                                    : "bg-white text-[#2A2A2B]"
                                }`}
                            onClick={() => table.setPageIndex(pageNumber)}
                        >
                            {pageNumber + 1}
                        </button>
                    ),
                )}
            </div>
        </div>
    );
};

export default Pagination;
