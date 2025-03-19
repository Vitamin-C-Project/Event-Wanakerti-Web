import { columns } from "./columns";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Filter, Loader2, Plus } from "lucide-react";
import Hook from "./hook";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import { DataTable } from "./data-table";
import { DataTablePagination } from "@/components/pagination-datatable";

export default function ParticipantPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dasbor", href: "/dashboard" },
        { title: "Member", href: "/dashboard/member/participants" },
        { title: "Data Peserta", href: "/dashboard/member/participants" },
      ]}
    >
      <Flex align={"center"} justify={"between"} gap={"4"} className="mb-4">
        <Heading>Data Peserta</Heading>

        <Flex>
          <Button
            variant={"secondary"}
            className="me-3"
            onClick={() => handler.setShowFilter(true)}
          >
            <Filter /> <Text className="md:block hidden">Filter</Text>
          </Button>
          <Button
            onClick={() =>
              handler.setVisible({
                show: true,
                type: 1,
                title: "Tambah Peserta Baru",
              })
            }
          >
            <Plus /> <Text className="md:block hidden">Tambah Baru</Text>
          </Button>
        </Flex>
      </Flex>

      <Grid columns={"1"}>
        <DataTable
          columns={columns({
            delete: handler.handleDelete,
          })}
          data={state.members}
          isLoadingData={state.isLoadingData}
        />
      </Grid>
      <DataTablePagination
        metadata={state.metadata!}
        onPageChange={(e) =>
          handler.setPagination({ ...state.pagination, page: e })
        }
      />

      <Drawer
        direction="right"
        open={state.showFilter}
        onOpenChange={() => handler.setShowFilter(false)}
      >
        <DrawerContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <form onSubmit={handler.appliedFilters}>
            <DrawerHeader>
              <DrawerTitle>Semua Jenis Filter dan Pencarian</DrawerTitle>
            </DrawerHeader>
            <Flex direction={"column"} className="px-4">
              {state.user.role?.id != state.userType.PARTICIPANT && (
                <Flex direction={"column"} className="w-full mb-5">
                  <Label htmlFor="type" className="mb-2">
                    Asal Pangkalan
                  </Label>
                  <Popover
                    open={state.openComboboxSchool}
                    onOpenChange={() => handler.setOpenComboboxSchool(true)}
                  >
                    <PopoverTrigger asChild disabled={state.isLoadingForm}>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={state.openComboboxSchool}
                        className="justify-between"
                      >
                        {state.filters.participant_school_id
                          ? state.schools.find(
                              (school) =>
                                school.id == state.filters.participant_school_id
                            )?.name
                          : "Cari pangkalan..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Cari pangkalan..."
                          value={state.filterSchool.search}
                          onValueChange={(value) => {
                            handler.setFilterSchool({ search: value });
                          }}
                        />
                        <CommandList>
                          <CommandEmpty>
                            pangkalan tidak ditemukan.
                          </CommandEmpty>
                          <CommandGroup>
                            {state.schools.map((school) => (
                              <CommandItem
                                key={school.id}
                                onSelect={() => {
                                  handler.setFilterSchool({ search: "" });
                                  handler.setFilters({
                                    ...state.filters,
                                    participant_school_id: Number(school.id),
                                  });
                                  handler.setOpenComboboxSchool(false);
                                  handler.setSchool(school);
                                }}
                              >
                                <Check
                                  className={cn("mr-2 h-4 w-4", "opacity-0")}
                                />
                                {school.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </Flex>
              )}
              <Flex direction={"column"} className="w-full mb-5">
                <Label htmlFor="type" className="mb-2">
                  Tim
                </Label>
                <Popover
                  open={state.openCombobox}
                  onOpenChange={handler.setOpenCombobox}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={state.openCombobox}
                      className=" justify-between"
                    >
                      {state.filters.team_id
                        ? state.teams.find(
                            (team) => team.id == Number(state.filters.team_id)
                          )?.name
                        : "Pilih Tim..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" p-0">
                    <Command>
                      <CommandInput
                        placeholder="Cari tim..."
                        className="h-9"
                        onValueChange={(value) => {
                          handler.setFilterTeam({ search: value });
                        }}
                      />
                      <CommandList>
                        <CommandEmpty>Tim tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                          {state.teams.map((team) => (
                            <CommandItem
                              key={team.id}
                              onSelect={() => {
                                handler.setOpenCombobox(false);
                                handler.setFilters({
                                  ...state.filters,
                                  team_id: Number(team.id),
                                });
                                handler.setTeam(team);
                              }}
                            >
                              {team.name}
                              <Check className={cn("ml-auto", "opacity-0")} />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Flex>
            <DrawerFooter>
              <Button>Terapkan Filter</Button>
              <DrawerClose>
                <Button type="button" variant="outline" className="w-full">
                  Batal
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>

      <Dialog
        open={state.visible.show}
        onOpenChange={() => handler.resetState()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{state.visible.title}</DialogTitle>
          </DialogHeader>
          <Form {...state.form}>
            <form
              onSubmit={state.form.handleSubmit(handler.handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={state.form.control}
                name="participant_team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="participant_team">Tim</FormLabel>
                    <FormControl>
                      <Popover
                        open={state.openCombobox}
                        onOpenChange={handler.setOpenCombobox}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={state.openCombobox}
                            className=" justify-between"
                          >
                            {field.value
                              ? state.teams.find(
                                  (team) => team.id == Number(field.value)
                                )?.name
                              : "Pilih Tim..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command>
                            <CommandInput
                              placeholder="Cari tim..."
                              className="h-9"
                              onValueChange={(value) => {
                                handler.setFilterTeam({ search: value });
                              }}
                            />
                            <CommandList>
                              <CommandEmpty>Tim tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {state.teams.map((team) => (
                                  <CommandItem
                                    key={team.id}
                                    onSelect={() => {
                                      handler.setOpenCombobox(false);
                                      field.onChange(team.id?.toString());
                                      handler.setTeam(team);
                                    }}
                                  >
                                    {team.name}
                                    <Check
                                      className={cn("ml-auto", "opacity-0")}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={state.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nama Lengkap Peserta</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder=""
                        {...field}
                        disabled={state.isLoadingForm}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={state.form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="class">Kelas</FormLabel>
                    <FormControl>
                      <Input
                        id="class"
                        type="text"
                        placeholder=""
                        {...field}
                        disabled={state.isLoadingForm}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={state.form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="gender">Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        disabled={state.isLoadingForm}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Laki-laki</SelectItem>
                          <SelectItem value="2">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={state.form.control}
                name="badge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="badge">Kartu Tanda Anggota</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e: any) => field.onChange(e.target.files[0])}
                        disabled={state.isLoadingForm}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={state.form.control}
                name="proof_health"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="proof_health">
                      Surat Bukti Kesehatan
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e: any) => field.onChange(e.target.files[0])}
                        disabled={state.isLoadingForm}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="justify-content-between">
                {state.isLoadingForm ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Silahkan tunggu
                  </Button>
                ) : (
                  <>
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        onClick={() => handler.resetState()}
                        size="sm"
                      >
                        Batal
                      </Button>
                    </DialogClose>
                    <Button color="primary" size="sm" type="submit">
                      Simpan
                    </Button>
                  </>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
