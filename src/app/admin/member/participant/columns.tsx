import { Button } from "@/components/ui/button";
import { ParticipantMemberInterface } from "@/interfaces/participant_interface";
import { Flex } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";

type childProps = {
  edit?: (data: ParticipantMemberInterface) => void;
  delete: (data: ParticipantMemberInterface) => void;
};

export const columns = (
  props: childProps
): ColumnDef<ParticipantMemberInterface>[] => {
  return [
    {
      accessorKey: "team.name",
      header: "Nama Tim",
    },
    {
      accessorKey: "name",
      header: "Nama Peserta",
    },
    {
      accessorKey: "class",
      header: "Kelas",
    },
    {
      accessorKey: "gender",
      header: "Jenis Kelamin",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <div className="capitalize">
            {Number(original.gender) == 1 ? "Laki-laki" : "Perempuan"}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Flex align="center" gap={"3"}>
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
