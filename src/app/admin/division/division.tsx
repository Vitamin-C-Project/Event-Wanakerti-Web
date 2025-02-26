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
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import DashboardLayout from "@/layout/dashboard-layout";
import { DataTable } from "./data-table";
import {
  Dialog,
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
        onOpenChange={() =>
          handler.setVisible({ show: false, title: "", type: 1 })
        }
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
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={state.openCombobox}
                            className=" justify-between"
                          >
                            {"Pilih Bidang"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search framework..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {state.schoolTypes.map((type) => (
                                  <CommandItem
                                    key={type.VALUE}
                                    value={type.VALUE}
                                    onSelect={(currentValue) => {}}
                                  >
                                    {type.VALUE}
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
                    <FormLabel htmlFor="price">Harga Bidang</FormLabel>
                    <FormControl>
                      <Input
                        id="price"
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
                                />

                                <i
                                  className="uil-times-circle fs-3 text-danger cursor-pointer"
                                  onClick={() =>
                                    state.formMarking.remove(index)
                                  }
                                ></i>
                              </Flex>
                            );
                          }
                        )}
                        <Button
                          type="button"
                          onClick={() => state.formMarking.append("")}
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
                <Button
                  variant="secondary"
                  onClick={() =>
                    handler.setVisible({ show: false, title: "", type: 1 })
                  }
                  size="sm"
                >
                  Batal
                </Button>
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
