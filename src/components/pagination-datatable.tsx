import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { IMeta } from "@/interfaces/common";
import { Flex, Text } from "@radix-ui/themes";

interface DataTablePaginationProps<TData> {
  table?: Table<TData>;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  metadata: IMeta;
  showLimit?: boolean;
}

export function DataTablePagination<TData>({
  table,
  onPageChange,
  onPageSizeChange,
  metadata,
  showLimit = false,
}: DataTablePaginationProps<TData>) {
  const pageSizes = [10, 20, 30, 40, 50];

  const [page, setPage] = useState(metadata?.current_page || 1);
  const [selectedPageSize, setSelectedPageSize] = useState("10");
  const handlePageChange = (actions: string) => {
    let newPage: number = page;
    if (actions == "prev") {
      if (page > 1) {
        newPage = page - 1;
      }
    }
    if (actions == "next") {
      if (metadata?.last_page !== undefined && newPage < metadata?.last_page) {
        newPage = page + 1;
      }
    }

    setPage(newPage);

    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number(value);
    setSelectedPageSize(value);
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  return (
    <Flex align={"center"} justify={"between"} className="px-2">
      {showLimit ? (
        <Flex align={"center"} className="space-x-2">
          <Text as="p" size={"2"} weight={"medium"}>
            Limit
          </Text>
          <Select value={selectedPageSize} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Flex>
      ) : (
        <div></div>
      )}
      <Flex className="space-x-6 lg:space-x-8" align={"center"}>
        <Flex className="flex-1 text-sm text-muted-foreground">
          {metadata?.from ?? 0} - {metadata?.to ?? 0} dari {metadata?.total}{" "}
          Total Data
        </Flex>
        <Flex align={"center"} className="space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange("prev")}
            disabled={page == 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange("next")}
            disabled={page == metadata?.last_page}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
