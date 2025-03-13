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
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { Label } from "@/components/ui/label";
import Hook from "./hook";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreMark({ user }: { user: UserInterface }) {
  const { state, handler } = Hook({ user: user });

  return (
    <div>
      <form onSubmit={handler.handleSubmit}>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Form Penilaian</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid columns={"12"} className="space-x-3 space-y-3">
              <div className="col-span-12">
                <Label>{"Tim"}</Label>
                <Popover open={state.open} onOpenChange={handler.setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={state.open}
                      className="w-full justify-between"
                      disabled={state.isLoadingForm}
                    >
                      {state.value
                        ? state.teams.find(
                            (team) => team.id == Number(state.value)
                          )?.name
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
                          {state.teams.map((team) => (
                            <CommandItem
                              key={team.id}
                              value={team.id?.toString()}
                              onSelect={(currentValue) => {
                                handler.setValue(
                                  currentValue == state.value
                                    ? ""
                                    : currentValue
                                );
                                handler.handleTeamChange(currentValue);
                                handler.setOpen(false);
                              }}
                            >
                              {team.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  Number(state.value) == team.id
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
                        state.form.markings.find((m) => m.id == child.id)
                          ?.mark || 0
                      }
                      onChange={(e) =>
                        handler.handleMarkChange(
                          child.id?.toString()!,
                          e.target.value
                        )
                      }
                      disabled={state.isLoadingForm}
                    />
                  </div>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardFooter className="justify-end">
            {state.isLoadingForm ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </Button>
            ) : (
              <Button type="submit">Simpan</Button>
            )}
          </CardFooter>
        </Card>
      </form>

      <Heading className="py-5">Data Penilaian - {user.marking?.name}</Heading>
      {state.isLoadingData ? (
        <Grid columns={"12"} className="space-x-3 space-y-3">
          <Skeleton className="h-9 col-span-12" />
          <Skeleton className="h-9 col-span-12" />
          <Skeleton className="h-9 col-span-12" />
        </Grid>
      ) : (
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
              {state.teamMarkings.map((team, index) => (
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
      )}
    </div>
  );
}
