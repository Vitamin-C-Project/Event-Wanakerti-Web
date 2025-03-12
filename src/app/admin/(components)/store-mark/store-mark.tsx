import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn, postData } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserInterface } from "@/interfaces/user_interface";
import { Badge, Grid, Heading, Text } from "@radix-ui/themes";
import React from "react";
import {
  ParticipantTeamInterface,
  ParticipantTeamMarkingInterface,
} from "@/interfaces/participant_interface";
import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { Label } from "@/components/ui/label";
import { MarkingChildrenInterface } from "@/interfaces/division_interface";
import { toastRender } from "@/lib/alert";

export default function StoreMark({ user }: { user: UserInterface }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [teams, setTeams] = React.useState<ParticipantTeamInterface[]>([]);
  const [teamMarkings, setTeamMarkings] = React.useState<
    ParticipantTeamMarkingInterface[]
  >([]);
  const [form, setForm] = React.useState<{
    participant_team_id: string;
    markings: MarkingChildrenInterface[];
  }>({
    participant_team_id: "",
    markings: [],
  });

  const validateForm = () => {
    if (!form.participant_team_id) {
      alert("Pilih tim terlebih dahulu");
      return false;
    }

    for (let marking of form.markings) {
      if (Number(marking.mark) < 0 || Number(marking.mark) > 100) {
        alert("Nilai harus berada antara 0-100");
        return false;
      }

      if (isNaN(Number(marking.mark))) {
        alert("Nilai harus berupa angka");
        return false;
      }
    }

    return true;
  };

  const handleTeamChange = (e: any) => {
    setForm({
      ...form,
      participant_team_id: e,
    });
  };

  const handleMarkChange = (markingId: string, value: string) => {
    let numValue = parseInt(value);

    if (isNaN(numValue)) {
      numValue = 0;
    }

    numValue = Math.max(0, Math.min(100, numValue));

    const newMarkings = form.markings.map((marking) => {
      if (marking.id?.toString() == markingId) {
        return { ...marking, mark: numValue };
      }
      return marking;
    });

    setForm({
      ...form,
      markings: newMarkings,
    });
  };

  const getTeams = async () => {
    try {
      let response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.TEAM.LIST,
        {}
      );

      setTeams(response.data.data);

      setForm((prev) => ({
        ...prev,
        markings: user.marking?.children!,
      }));
    } catch (error) {}
  };

  const getTeamMarkings = async () => {
    try {
      let response = await postData(API_PATH_CONSTANT.MARKING.LIST, {});

      setTeamMarkings(response.data.data);
    } catch (error) {}
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await postData(API_PATH_CONSTANT.MARKING.SAVE, form);
        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);

        setValue("");
        setForm({
          participant_team_id: "",
          markings: user.marking?.children?.map((criteria) => ({
            id: criteria.id,
            mark: 0,
            name: criteria.name,
          })),
        });
      } catch (error: any) {
        toastRender(error.status, error.response.data.messages);
      } finally {
      }
    }
  };

  React.useEffect(() => {
    getTeams();
    getTeamMarkings();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Form Penilaian</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid columns={"12"} className="space-x-3 space-y-3">
              <div className="col-span-12">
                <Label>{"Tim"}</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {value
                        ? teams.find((team) => team.id == Number(value))?.name
                        : "Pilih tim..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Cari tim..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>Tim tidak ada.</CommandEmpty>
                        <CommandGroup>
                          {teams.map((team) => (
                            <CommandItem
                              key={team.id}
                              value={team.id?.toString()}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue == value ? "" : currentValue
                                );
                                handleTeamChange(currentValue);
                                setOpen(false);
                              }}
                            >
                              {team.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  Number(value) == team.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <Grid columns={"2"} gap="3" width="auto" className="col-span-12">
                {user.marking?.children?.map((child) => (
                  <div key={child.id}>
                    <Label>{child.name}</Label>
                    <Input
                      value={
                        form.markings.find((m) => m.id == child.id)?.mark || 0
                      }
                      onChange={(e) =>
                        handleMarkChange(child.id?.toString()!, e.target.value)
                      }
                    />
                  </div>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardFooter className="justify-end">
            <Button>Simpan</Button>
          </CardFooter>
        </Card>
      </form>

      <Heading className="py-5">Data Penilaian - {user.marking?.name}</Heading>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tim</TableHead>
              {user.marking?.children?.map((child) => (
                <TableHead>{child.name}</TableHead>
              ))}
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMarkings.map((team, index) => (
              <TableRow key={index}>
                <TableCell>{team.name}</TableCell>
                {team.marking?.map((mark, markIndex) => (
                  <TableCell key={markIndex}>
                    <Badge size={"3"}>
                      <Text size={"3"}>{mark.mark}</Text>
                    </Badge>
                  </TableCell>
                ))}
                <TableCell>
                  <Button variant={"secondary"}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
