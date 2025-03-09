import { Button } from "@/components/ui/button";
import { UserInterface } from "@/interfaces/user_interface";
import { Flex } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";

type childProps = {
  edit: (data: UserInterface) => void;
  delete: (data: UserInterface) => void;
  editPassword: (data: UserInterface) => void;
};

export const columns = (props: childProps): ColumnDef<UserInterface>[] => {
  return [
    {
      accessorKey: "name",
      header: "Nama Lengkap",
    },
    {
      accessorKey: "username",
      header: "Nama Akun",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Flex align="center" gap={"2"}>
            <Button
              size="sm"
              className="me-3"
              onClick={() => props.edit(original)}
            >
              Edit Profil
            </Button>
            <Button
              variant={"secondary"}
              size="sm"
              onClick={() => props.editPassword(original)}
              className="me-3"
            >
              Edit Password
            </Button>
            <Button
              size="sm"
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
