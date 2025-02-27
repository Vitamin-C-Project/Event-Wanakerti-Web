import { Button } from "@/components/ui/button";
import { BrandInterface } from "@/interfaces/cms_interface";
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
  edit: (data: BrandInterface) => void;
  delete: (data: BrandInterface) => void;
};

export const columns = (props: childProps): ColumnDef<BrandInterface>[] => {
  const navigate = useNavigate();

  return [
    {
      accessorKey: "title",
      header: "Nama Sponsor atau Brand",
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
          </Flex>
        );
      },
    },
  ];
};
