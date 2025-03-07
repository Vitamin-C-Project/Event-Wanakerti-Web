import { Button, ButtonLink } from "@/components/ui/button";
import { ParticipantTeamMemberInterface } from "@/interfaces/participant_interface";
import { ColumnDef } from "@tanstack/react-table";

type childProps = {
  edit?: (data: ParticipantTeamMemberInterface) => void;
  delete: (data: ParticipantTeamMemberInterface) => void;
};

export const columns = (
  props: childProps
): ColumnDef<ParticipantTeamMemberInterface>[] => {
  return [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => {
        if (row.original.type === "team") {
          return <strong>{row.original.name}</strong>;
        }
        return <span className="pl-4">↳ {row.original.name}</span>; // Indentasi untuk member
      },
    },
    {
      accessorKey: "class",
      header: "Kelas",
      cell: ({ row }) =>
        row.original.type === "member" ? row.original.class : "",
    },
    {
      accessorKey: "gender",
      header: "Jenis Kelamin",
      cell: ({ row }) => {
        if (row.original.type === "team") return "";
        return row.original.gender === 1 ? "Laki-laki" : "Perempuan";
      },
    },
    {
      accessorKey: "badge",
      header: "KTA",
      cell: ({ row }) =>
        row.original.type === "member" ? (
          <ButtonLink to={row.original.badge} target="_blank">
            Lihat
          </ButtonLink>
        ) : (
          ""
        ),
    },
    {
      accessorKey: "proof_health",
      header: "Bukti Kesehatan",
      cell: ({ row }) =>
        row.original.type === "member" ? (
          <ButtonLink to={row.original.proof_health} target="_blank">
            Lihat
          </ButtonLink>
        ) : (
          ""
        ),
    },
    {
      id: "actions",
      cell: ({ row }) =>
        row.original.type === "member" ? (
          <Button
            variant={"destructive"}
            onClick={() => props.delete(row.original)}
          >
            Hapus
          </Button>
        ) : (
          ""
        ),
    },
  ];
};
