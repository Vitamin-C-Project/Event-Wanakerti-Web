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
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import DashboardLayout from "@/layout/dashboard-layout";
import { DataTable } from "./data-table";
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

export default function DivisionPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dasbor", href: "/dashboard" },
        { title: "Divisi", href: "/dashboard/division" },
      ]}
    >
      <Flex align={"center"} justify={"between"}>
        <Heading>Daftar Divisi</Heading>
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

      <DataTable
        columns={columns({
          edit: handler.handleEdit,
          delete: handler.handleDelete,
        })}
        data={state.divisions}
      />

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
