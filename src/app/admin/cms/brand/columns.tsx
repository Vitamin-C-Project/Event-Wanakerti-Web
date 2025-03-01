import { Button, ButtonLink, buttonVariants } from "@/components/ui/button";
import { BrandInterface } from "@/interfaces/cms_interface";
import { cn } from "@/lib/utils";
import { Flex, Text } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";

type childProps = {
  edit: (data: BrandInterface) => void;
  delete: (data: BrandInterface) => void;
};

export const columns = (props: childProps): ColumnDef<BrandInterface>[] => {
  const navigate = useNavigate();

  return [
    {
      accessorKey: "name",
      header: "Nama Brand atau Sponsor",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Flex align="center" gap={"2"}>
            <a
              href={original.image}
              target="_blank"
              className={cn(buttonVariants("default", "default", ""))}
            >
              Lihat Gambar
            </a>
            <Button
              className="ml-3"
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
