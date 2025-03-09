import DashboardLayout from "@/layout/dashboard-layout";
import { columns } from "./columns";
import Hook from "./hook";
import { Flex, Heading } from "@radix-ui/themes";
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
      <Flex align={"center"} justify={"between"}>
        <Heading>Data Tim</Heading>
        <Flex>
          <Button
            variant={"secondary"}
            className="me-3"
            onClick={() => handler.setShowFilter(true)}
          >
            <Filter /> Filter
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
            <Plus /> Tambah Baru
          </Button>
        </Flex>
      </Flex>

      <DataTable
        columns={columns({
          edit: handler.handleEdit,
          delete: handler.handleDelete,
        })}
        data={state.teams}
        isLoadingData={state.isLoadingData}
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
                disabled={state.isLoadingForm}
              />
            </Flex>
            <Flex direction={"column"} className="w-full mb-5">
              <Label htmlFor="type" className="mb-2">
                Asal Pangkalan
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0">Semua Pangkalan</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
            <Flex direction={"column"} className="w-full mb-5">
              <Label htmlFor="type" className="mb-2">
                Jenis Bidang Lomba
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0">Semua Bidang Lomba</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Flex>
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
          </Flex>
          <DrawerFooter>
            <Button>Terapkan Filter</Button>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Batal
              </Button>
            </DrawerClose>
          </DrawerFooter>
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
              {state.location.pathname.includes("/dashboard/member/teams") && (
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
                              <CommandInput placeholder="Cari pangkalan..." />
                              <CommandList>
                                <CommandEmpty>
                                  pangkalan tidak ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                  {state.schools.map((school) => (
                                    <CommandItem
                                      key={school.id}
                                      value={school.id?.toString()}
                                      onSelect={(currentValue) => {
                                        handler.setOpenComboboxSchool(false);
                                        field.onChange(currentValue);
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
                              state.form.getValues("school").length < 1 ||
                              state.isLoadingForm
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
                                      value={division.id?.toString()}
                                      onSelect={(currentValue) => {
                                        handler.setOpenComboboxDivision(false);
                                        field.onChange(currentValue);
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

              <FormField
                control={state.form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="status">Status Keikutsertaan</FormLabel>
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
    </DashboardLayout>
  );
}
