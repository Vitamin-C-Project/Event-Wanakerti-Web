import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { USER_TYPE_CONSTANT } from "@/constants/global_constant";
import { ParticipantTeamInterface } from "@/interfaces/participant_interface";
import { useAppSelector } from "@/lib/hooks";
import { Flex, Text } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, CircleX } from "lucide-react";

type childProps = {
  edit: (data: ParticipantTeamInterface) => void;
  delete: (data: ParticipantTeamInterface) => void;
  detail: (data: ParticipantTeamInterface) => void;
  updateReRegistration: (data: ParticipantTeamInterface) => void;
};

export const columns = (
  props: childProps
): ColumnDef<ParticipantTeamInterface>[] => {
  const user = useAppSelector((state) => state.user.userAuthenticated);

  return [
    {
      id: "team",
      header: "Nama Tim",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Text className="font-bold" onClick={() => props.detail(original)}>
            ({original.code}) - {original.name}
          </Text>
        );
      },
    },
    {
      accessorKey: "school.name",
      header: "Asal Pangkalan",
    },
    {
      accessorKey: "division.name",
      header: "Bidang Lomba",
    },
    {
      accessorKey: "payment_status",
      header: "Status Pembayaran",
      cell: ({ row }) => {
        const original = row.original;

        return original.payment_status ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <CircleX className="text-red-500" />
        );
      },
    },
    {
      id: "re_registration_status",
      header: "Status Registrasi Ulang",
      cell: ({ row }) => {
        const original = row.original;

        return original.re_registration_status ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <Flex align={"center"} gap={"3"}>
            {user.role?.id != USER_TYPE_CONSTANT.PARTICIPANT && (
              <Switch
                disabled={!original.payment_status}
                onClick={() => props.updateReRegistration(original)}
              />
            )}
            <CircleX className="text-red-500 ms-2" />
          </Flex>
        );
      },
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
              onClick={() => props.detail(original)}
            >
              Nilai Hasil
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
