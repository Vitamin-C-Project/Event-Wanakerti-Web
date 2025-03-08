import { Button } from "@/components/ui/button";
import { ParticipantSchoolInterface } from "@/interfaces/participant_interface";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";

type childProps = {
  edit: (data: ParticipantSchoolInterface) => void;
  delete: (data: ParticipantSchoolInterface) => void;
};

export const columns = (
  props: childProps
): ColumnDef<ParticipantSchoolInterface>[] => {
  return [
    {
      id: "base",
      header: "Pangkalan",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Flex gap={"2"} direction="column">
            <div>
              <Heading className="mb-2">{original.name}</Heading>
              <br />
            </div>
            <Flex direction={"column"} gap={"2"}>
              <div className="w-full overflow-hidden mb-2">
                <Text className="text-ellipsis">
                  Tingkat : <br /> {original.school_type.name}
                </Text>
              </div>
            </Flex>
          </Flex>
        );
      },
    },
    {
      id: "contact",
      header: "Kontak",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Flex align="start" gap={"2"} direction="column">
            <div>
              <Heading className="mb-2">{original.person_responsible}</Heading>
              <br />
            </div>
            <Flex direction={"column"} gap={"2"}>
              <div className="overflow-hidden mb-2">
                <Text className="text-ellipsis">
                  No Hp : <br /> {original.phone_number}
                </Text>
              </div>
              <div className="overflow-hidden">
                <Text className="text-ellipsis">
                  Email : <br /> {original.email}
                </Text>
              </div>
            </Flex>
          </Flex>
        );
      },
    },
    {
      id: "count_team",
      header: "Jumlah Team",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Flex align="start" gap={"2"} direction="column">
            <Flex direction={"column"} gap={"2"}>
              <div className="w-full overflow-hidden mb-2">
                <Text className="text-ellipsis ">
                  Hiking : <br />{" "}
                  <Text className="font-semibold">
                    {original.hiking_count} Regu
                  </Text>
                </Text>
              </div>
              <div className="w-full overflow-hidden">
                <Text className="text-ellipsis ">
                  LKBBT : <br />{" "}
                  <Text className="font-semibold">
                    {original.lkbbt_count} Pleton
                  </Text>
                </Text>
              </div>
            </Flex>
          </Flex>
        );
      },
    },
    {
      accessorKey: "address",
      header: "Alamat",
      cell: ({ row }) => {
        const original = row.original;

        return <div className="w-36">{original.address}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Flex align="center" gap={"2"}>
            <Button
              variant={"secondary"}
              size="sm"
              className="mr-3"
              onClick={() => props.edit(original)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => props.delete(original)}
            >
              Delete
            </Button>
          </Flex>
        );
      },
    },
  ];
};
