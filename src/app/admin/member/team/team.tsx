import DashboardLayout from "@/layout/dashboard-layout";
import { columns } from "./columns";
import Hook from "./hook";
import { DataList, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  Filter,
  Info,
  Loader2,
  Plus,
} from "lucide-react";
import { DataTable } from "@/components/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTablePagination } from "@/components/pagination-datatable";

export default function TeamPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dasbor", href: "/dashboard" },
        { title: "Member", href: "/dashboard/member/teams" },
        { title: "Data Tim", href: "/dashboard/member/teams" },
      ]}
    >
      <Flex align={"center"} justify={"between"} gap={"4"} className="mb-4">
        <Heading>Data Tim</Heading>
        <Flex>
          <Button
            variant={"secondary"}
            className="me-3"
            onClick={() => {
              handler.setShowFilter(true);
              handler.getDivisions();
            }}
          >
            <Filter /> <Text className="md:block hidden">Filter</Text>
          </Button>
          <Button
            onClick={() =>
              handler.setVisible({
                show: true,
                type: 1,
                title: "Tambah Tim Baru",
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
            edit: handler.handleEdit,
            delete: handler.handleDelete,
            updateReRegistration: handler.handleUpdateReRegistration,
            detail: handler.handleDetail,
          })}
          data={state.teams}
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
              <Flex direction={"column"} className="w-full mb-5">
                <Label htmlFor="search" className="mb-2">
                  Pencarian
                </Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Pencarian berdasarkan nama tim"
                  value={state.filters.search}
                  onChange={(e: any) =>
                    handler.setFilters({
                      ...state.filters,
                      search: e.target.value,
                    })
                  }
                />
              </Flex>
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
                                    participant_school_id: school.id,
                                  });
                                  handler.setOpenComboboxSchool(false);
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
                  Jenis Bidang Lomba
                </Label>
                <Select
                  onValueChange={(value) =>
                    handler.setFilters({
                      ...state.filters,
                      division_id: Number(value),
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        state.filters.division_id
                          ? state.divisions.find(
                              (division) =>
                                division.id == state.filters.division_id
                            )?.name
                          : "Semua Bidang Lomba"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Semua Bidang Lomba</SelectItem>
                      {state.divisions.map((division) => (
                        <SelectItem
                          key={division.id}
                          value={division.id?.toString() || ""}
                        >
                          {division.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Flex>
              {/* {state.user.role?.id != state.userType.PARTICIPANT && (
                <Flex direction={"column"} className="w-full mb-5">
                  <Label htmlFor="type" className="mb-2">
                    Status
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">Semua Status</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Flex>
              )} */}
            </Flex>
            <DrawerFooter>
              <Button type="submit">Terapkan Filter</Button>
              <DrawerClose>
                <Button variant="outline" className="w-full" type="button">
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
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="min-w-[40%]"
        >
          <DialogHeader>
            <DialogTitle>{state.visible.title}</DialogTitle>
          </DialogHeader>
          <Form {...state.form}>
            <form
              className={cn("flex flex-col gap-5")}
              onSubmit={
                state.visible.type == 1
                  ? state.form.handleSubmit(handler.handleSubmit)
                  : state.form.handleSubmit(handler.handleUpdate)
              }
            >
              {state.user.role?.id != state.userType.PARTICIPANT && (
                <FormField
                  control={state.form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="school">Asal Pangkalan</FormLabel>
                      <FormControl>
                        <Popover
                          open={state.openComboboxSchool}
                          onOpenChange={() =>
                            handler.setOpenComboboxSchool(true)
                          }
                        >
                          <PopoverTrigger
                            asChild
                            disabled={state.isLoadingForm}
                          >
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={state.openComboboxSchool}
                              className="justify-between"
                            >
                              {state.school
                                ? state.school.name
                                : "Cari pangkalan..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput
                                placeholder="Cari pangkalan..."
                                value={state.filterSchool.search}
                                onValueChange={(value) =>
                                  handler.setFilterSchool({ search: value })
                                }
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
                                        handler.setOpenComboboxSchool(false);
                                        field.onChange(school.id?.toString());
                                        handler.setSchool(school);
                                        handler.getDivisions(school);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          "opacity-0"
                                        )}
                                      />
                                      {school.name}
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
              )}

              {state.visible.type == 1 && (
                <FormField
                  control={state.form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="participant_school_type">
                        Bidang Lomba
                      </FormLabel>
                      <FormControl>
                        <Popover
                          open={state.openComboboxDivision}
                          onOpenChange={() =>
                            handler.setOpenComboboxDivision(true)
                          }
                        >
                          <PopoverTrigger
                            asChild
                            disabled={
                              (state.form.getValues("school").length < 1 ||
                                state.isLoadingForm) &&
                              state.user.role?.id != state.userType.PARTICIPANT
                            }
                          >
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={state.openComboboxDivision}
                              className="justify-between"
                            >
                              {state.division
                                ? state.division.name
                                : "Cari bidang..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Cari bidang..." />
                              <CommandList>
                                <CommandEmpty>
                                  bidang tidak ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                  {state.divisions.map((division) => (
                                    <CommandItem
                                      key={division.id}
                                      onSelect={() => {
                                        handler.setOpenComboboxDivision(false);
                                        field.onChange(division.id?.toString());
                                        handler.setDivision(division);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          "opacity-0"
                                        )}
                                      />
                                      {division.name}
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
              )}
              <FormField
                control={state.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nama Team</FormLabel>
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

              {state.user.role?.id != state.userType.PARTICIPANT && (
                <>
                  <FormField
                    control={state.form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="status">
                          Status Keikutsertaan
                        </FormLabel>
                        <FormControl>
                          <Switch
                            disabled={state.isLoadingForm}
                            checked={field.value}
                            {...handler.register("status")}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={state.form.control}
                    name="payment_status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="payment_status">
                          Status Pembayaran
                        </FormLabel>
                        <FormControl>
                          <Switch
                            disabled={state.isLoadingForm}
                            checked={field.value}
                            {...handler.register("payment_status")}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <DialogFooter>
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

      <Dialog
        open={state.isDetailModal}
        onOpenChange={() => {
          handler.setIsDetailModal(false);
          handler.setTeam(undefined);
        }}
      >
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="min-w-[40%]"
        >
          {state.isDetailModal && state.team ? (
            <>
              <DialogHeader>
                <DialogTitle className="uppercase">
                  Detail {state.team?.name}
                </DialogTitle>
              </DialogHeader>
              <Flex direction={"column"} className="gap-3">
                <Flex className="gap-3" align={"center"}>
                  <Text as="p">Asal Pangkalan :</Text>
                  <Heading>{state.team?.school.name}</Heading>
                </Flex>
                <Flex className="gap-3" align={"center"}>
                  <Text as="p">Bidang Lomba :</Text>
                  <Heading>{state.team?.division?.name}</Heading>
                </Flex>
              </Flex>
              {Object.entries(state.team?.markings!).length > 0 ? (
                <Grid
                  className="gap-3"
                  columns={{ initial: "1", sm: "2", xs: "1" }}
                >
                  {Object.entries(state.team?.markings!).map(
                    ([key, marking]) => {
                      return (
                        <Card key={key} className="shadow-none">
                          <CardHeader>
                            <CardTitle>{marking.name}</CardTitle>
                            <CardDescription>
                              Total Nilai{" "}
                              <strong className="text-black">
                                {marking.total}
                              </strong>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <DataList.Root>
                              {marking.children?.map((child, keyChild) => (
                                <DataList.Item key={keyChild} className="mb-3">
                                  <DataList.Label>{child.name}</DataList.Label>
                                  <DataList.Value>
                                    :{" "}
                                    <Text className="font-bold">
                                      {child.mark}
                                    </Text>
                                  </DataList.Value>
                                </DataList.Item>
                              ))}
                            </DataList.Root>
                          </CardContent>
                        </Card>
                      );
                    }
                  )}
                </Grid>
              ) : (
                <Alert variant="default" className="bg-warning">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-black">
                    Belum ada nilai yang masuk.
                  </AlertDescription>
                </Alert>
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handler.setIsDetailModal(false);
                      handler.setTeam(undefined);
                    }}
                    size="sm"
                  >
                    Tutup
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          ) : (
            <Flex direction={"column"} className="space-y-3 mt-5">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </Flex>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
