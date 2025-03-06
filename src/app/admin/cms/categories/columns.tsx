import { Button, ButtonLink } from "@/components/ui/button";
import { CategoryInterface } from "@/interfaces/cms_interface";
import { formatCurrency } from "@/lib/utils";
import { Flex, Text } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import {
  Check,
  CheckCheck,
  CheckCircle,
  CircleX,
  Cross,
  MarsStroke,
} from "lucide-react";
import { format } from "path";
import { Link, useNavigate } from "react-router-dom";

type childProps = {
  edit: (data: CategoryInterface) => void;
  delete: (data: CategoryInterface) => void;
};

export const columns = (props: childProps): ColumnDef<CategoryInterface>[] => {
  const navigate = useNavigate();

  return [
    {
      id: "category",
      header: "Nama Kategori",
      cell: ({ row }) => {
        const original = row.original;

        return <Text className="font-bold">{original.school_type.name}</Text>;
      },
    },
    {
      accessorKey: "price",
      header: "Harga Pendaftaran",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Text className="font-bold">
            {formatCurrency(Number(original.price))}
          </Text>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Deskripsi",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Flex align="center" gap={"2"}>
            <ButtonLink
              variant="default"
              size="sm"
              className="me-2"
              to={original.image}
              target="_blank"
            >
              Lihat Gambar
            </ButtonLink>
            <Button
              variant="secondary"
              size="sm"
              className="me-2"
              onClick={() => props.edit(original)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
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
