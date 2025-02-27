import { Button } from "@/components/ui/button";
import { CategoryInterface } from "@/interfaces/cms_interface";
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

        return <Text className="font-bold">{original.division.name}</Text>;
      },
    },
    {
      accessorKey: "division.price",
      header: "Harga Pendaftaran",
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
            <Button
              variant="default"
              size="sm"
              className="me-2"
              onClick={() => navigate(`/member/teams/${original.image}`)}
            >
              Lihat Gambar
            </Button>
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
