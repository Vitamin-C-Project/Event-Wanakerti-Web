import { LeaderboardInterface } from "@/interfaces/cms_interface";
import { Text } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (props: any): ColumnDef<LeaderboardInterface>[] => {
  return [
    {
      accessorKey: "code",
      header: "Nama Tim",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Text className="font-bold">
            ({original.code}) - {original.name}
          </Text>
        );
      },
    },
    {
      accessorKey: "school_name",
      header: "Asal Pangkalan",
    },
    {
      accessorKey: "mark",
      header: "Nilai",
    },
  ];
};
