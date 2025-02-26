import { Button } from "@/components/ui/button";
import { DivisionInterface } from "@/interfaces/division_interface";
import { Flex } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";

type childProps = {
  edit: (data: DivisionInterface) => void;
  delete: (data: DivisionInterface) => void;
};

export const columns = (props: childProps): ColumnDef<DivisionInterface>[] => {
  return [
    {
      accessorKey: "name",
      header: "Nama Divisi",
    },
    {
      accessorKey: "school_type.name",
      header: "Tipe Divisi",
    },
    {
      accessorKey: "price",
      header: "Harga",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Flex align="center" gap={"3"}>
            <Button
              size="sm"
              className="me-2 cursor-pointer"
              variant={"secondary"}
              onClick={() => props.edit(original)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              className=" cursor-pointer"
              variant={"destructive"}
              onClick={() => props.delete(original)}
            >
              Hapus
            </Button>
          </Flex>
        );
      },
    },
  ];
};
