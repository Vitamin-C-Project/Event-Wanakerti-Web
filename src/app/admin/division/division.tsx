import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { columns } from "./columns";
import Hook from "./hook";
import { Input } from "@/components/ui/input";
import { Flex, Heading } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Filter, Plus, X } from "lucide-react";
import DashboardLayout from "@/layout/dashboard-layout";
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
import { DataTable } from "@/components/data-table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DivisionPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dasbor", href: "/dashboard" },
        { title: "Pengaturan", href: "/dashboard/division" },
        { title: "Divisi", href: "/dashboard/division" },
      ]}
    >
      <Flex align={"center"} justify={"between"}>
        <Heading>Daftar Divisi</Heading>

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
                title: "Tambah Divisi Baru",
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
        data={state.divisions}
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
                placeholder="Pencarian berdasarkan nama"
                disabled={state.isLoadingForm}
              />
            </Flex>
            <Flex direction={"column"} className="w-full mb-5">
              <Label htmlFor="type" className="mb-2">
                Divisi
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0">Semua Divisi</SelectItem>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{state.visible.title}</DialogTitle>
          </DialogHeader>
          <Form {...state.form}>
            <form
              onSubmit={
                state.visible.type == 1
                  ? state.form.handleSubmit(handler.handleSubmit)
                  : state.form.handleSubmit(handler.handleUpdate)
              }
              className="space-y-4"
            >
              <FormField
                control={state.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nama Bidang</FormLabel>
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
                name="school_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="school_type">Tipe Bidang</FormLabel>
                    <FormControl>
                      <Popover
                        open={state.openCombobox}
                        onOpenChange={handler.setOpenCombobox}
                      >
                        <PopoverTrigger asChild disabled={state.isLoadingForm}>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={state.openCombobox}
                            className=" justify-between"
                          >
                            {field.value
                              ? state.schoolTypes[Number(field.value) - 1].VALUE
                              : "Pilih Bidang"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command>
                            <CommandInput
                              placeholder="Cari no bidang..."
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
                                      handler.setOpenCombobox(false);
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
              <FormField
                control={state.form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="price">Harga Lomba</FormLabel>
                    <FormControl>
                      <Input
                        id="price"
                        type="text"
                        pattern="[0-9]*"
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
                name="markings"
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor="markings">Penilaian</FormLabel>
                    <FormControl>
                      <div className="mb-2">
                        {state.formMarking.fields.map(
                          (field: any, index: number) => {
                            return (
                              <Flex
                                key={index}
                                align="center"
                                gap={"2"}
                                className="mb-2"
                              >
                                <Input
                                  type="text"
                                  {...state.form.register(
                                    `markings.${index}` as const
                                  )}
                                  placeholder={`Penilaian ${index + 1}`}
                                  disabled={state.isLoadingForm}
                                />

                                <X
                                  className=" text-red-600 cursor-pointer ms-3"
                                  display={
                                    state.isLoadingForm ? "none" : "block"
                                  }
                                  onClick={() =>
                                    state.formMarking.remove(index)
                                  }
                                />
                              </Flex>
                            );
                          }
                        )}
                        <Button
                          type="button"
                          onClick={() => state.formMarking.append("")}
                          disabled={state.isLoadingForm}
                        >
                          Tambah Penilaian
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="justify-content-between">
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
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
