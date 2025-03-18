import { columns } from "./columns";
import Hook from "./hook";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Filter, Loader2, Plus } from "lucide-react";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SchoolPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dasbor", href: "/dashboard" },
        { title: "Member", href: "/dashboard/member/schools" },
        { title: "Data Pangkalan", href: "/dashboard/member/schools" },
      ]}
    >
      <Flex align={"center"} justify={"between"} gap={"4"} className="mb-4">
        <Heading>Data Pangkalan</Heading>
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
                title: "Tambah Pangkalan Baru",
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
          })}
          data={state.schools}
          isLoadingData={state.isLoadingData}
        />
      </Grid>

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
                  placeholder="Pencarian berdasarkan nama pangkalan dan kontak"
                  onChange={(e) =>
                    handler.setFilters({
                      ...state.filters,
                      search: e.target.value,
                    })
                  }
                  value={state.filters.search}
                  disabled={state.isLoadingForm}
                />
              </Flex>
              <Flex direction={"column"} className="w-full">
                <Label htmlFor="type" className="mb-2">
                  Jenis Pangkalan
                </Label>
                <Select
                  onValueChange={(e) =>
                    handler.setFilters({ ...state.filters, type: Number(e) })
                  }
                  value={state.filters.type!.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">Semua Jenis</SelectItem>
                      {state.schoolTypes.map((type) => (
                        <SelectItem value={type.KEY.toString()} key={type.KEY}>
                          {type.VALUE}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Flex>
            </Flex>
            <DrawerFooter>
              <Button type="submit">Terapkan Filter</Button>
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
              className={cn("flex flex-col gap-4")}
              onSubmit={
                state.visible.type == 1
                  ? state.form.handleSubmit(handler.handleSubmit)
                  : state.form.handleSubmit(handler.handleUpdate)
              }
            >
              <Flex className="gap-5">
                <FormField
                  control={state.form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="account">Akun Pengguna</FormLabel>
                      <FormControl>
                        <Popover
                          open={state.openComboboxUser}
                          onOpenChange={() => handler.setOpenComboboxUser(true)}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={state.openComboboxUser}
                              className="justify-between"
                            >
                              {state.user ? state.user.name : "Cari akun..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput
                                placeholder="Cari akun..."
                                className="text-primary"
                                onValueChange={(e) =>
                                  handler.setFilterUser({ search: e })
                                }
                              />
                              <CommandList>
                                <CommandEmpty>
                                  Akun tidak ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                  {state.users.map((user) => (
                                    <CommandItem
                                      key={user.id}
                                      onSelect={() => {
                                        field.onChange(user.id?.toString());
                                        handler.setOpenComboboxUser(false);
                                        handler.setUser(user);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          "opacity-0"
                                        )}
                                      />
                                      {user.name}
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
                  name="participant_school_type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="participant_school_type">
                        Tingkat Pangkalan
                      </FormLabel>
                      <FormControl>
                        <Popover
                          open={state.openComboboxSchool}
                          onOpenChange={handler.setOpenComboboxSchool}
                        >
                          <PopoverTrigger
                            asChild
                            disabled={state.isLoadingForm}
                          >
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={state.openComboboxSchool}
                              className=" justify-between"
                            >
                              {field.value
                                ? state.schoolTypes[Number(field.value) - 1]
                                    .VALUE
                                : "Pilih Tingkat..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className=" p-0">
                            <Command>
                              <CommandInput
                                placeholder="Cari no tingkat..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>
                                  Bidang tidak tersedia.
                                </CommandEmpty>
                                <CommandGroup>
                                  {state.schoolTypes.map((type) => (
                                    <CommandItem
                                      key={type.KEY}
                                      value={type.KEY.toString()}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        handler.setOpenComboboxSchool(false);
                                      }}
                                    >
                                      {type.KEY}). {type.VALUE}
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
              </Flex>
              <FormField
                control={state.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nama Pangkalan</FormLabel>
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
                name="person_responsible"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="person_responsible">
                      Penanggung Jawab
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="person_responsible"
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
              <Flex className="gap-5">
                <FormField
                  control={state.form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="phone_number">
                        No HP Penanggung Jawab
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="phone_number"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="email">
                        Email Penanggung Jawab
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
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
              </Flex>
              <FormField
                control={state.form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Alamat Pangkalan</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={state.isLoadingForm} />
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
