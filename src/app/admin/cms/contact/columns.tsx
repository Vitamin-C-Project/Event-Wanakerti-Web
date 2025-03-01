import { Button } from "@/components/ui/button";
import { ContactInterface } from "@/interfaces/cms_interface";
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
  edit: (data: ContactInterface) => void;
  delete: (data: ContactInterface) => void;
};

export const columns = (props: childProps): ColumnDef<ContactInterface>[] => {
  const navigate = useNavigate();

  return [
    {
      accessorKey: "full_name",
      header: "Nama Lengkap",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "message",
      header: "Pesan",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Flex align="center" gap={"2"}>
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
