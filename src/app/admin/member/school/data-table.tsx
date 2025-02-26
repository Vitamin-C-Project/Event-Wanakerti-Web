import { IMeta } from "@/interfaces/common";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useState } from "react";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  metadata?: IMeta;
  onPageChange?: (newPage: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
  variant?:
    | "striped"
    | "hover"
    | "bordered"
    | "borderless"
    | Array<"striped" | "hover" | "bordered" | "borderless">;
};

export default function DataTable<TData, TValue>({
  columns,
  data,
  metadata,
  onPageChange,
  onPageSizeChange,
  variant,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount: metadata?.last_page ?? 0,
  });

  const tableClasses = clsx(
    variant
      ? Array.isArray(variant)
        ? variant.map((v) => `table-${v}`).join(" ")
        : `table-${variant}`
      : ""
  );

  return (
    <div className="table-responsive">
      <CTable className={tableClasses}>
        <CTableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <CTableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <CTableHeaderCell key={header.id} className="text-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </CTableHeaderCell>
                );
              })}
            </CTableRow>
          ))}
        </CTableHead>
        <CTableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <CTableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <CTableDataCell
                    key={cell.id}
                    className={clsx(
                      cell.id.includes("contact") ||
                        cell.id.includes("count_team")
                        ? "text-nowrap"
                        : ""
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </CTableDataCell>
                ))}
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </div>
  );
}
