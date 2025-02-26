import DashboardLayout from "@/layout/dashboard-layout";
import { columns } from "./columns";
import Hook from "./hook";
import { Flex, Heading } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";
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

export default function TeamPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout>
      <Flex align={"center"} justify={"between"}>
        <Heading>Daftar Team</Heading>
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

      <DataTable
        columns={columns({
          edit: handler.handleEdit,
          delete: handler.handleDelete,
        })}
        data={state.teams}
      />

      <Dialog
        open={state.visible.show}
        onOpenChange={() =>
          handler.setVisible({ show: false, title: "", type: 1 })
        }
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
              onSubmit={state.form.handleSubmit(handler.handleSubmit)}
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
                          open={state.openCombobox}
                          onOpenChange={() => handler.setOpenCombobox(true)}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={state.openCombobox}
                              className="justify-between"
                            >
                              Cari pangkalan...
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
                                  {[
                                    "SMKN 1 Losarang",
                                    "SMPN 1 Losarang",
                                    "MTsN 1 Losarang",
                                  ].map((framework) => (
                                    <CommandItem
                                      key={framework}
                                      value={framework}
                                      onSelect={(currentValue) => {
                                        handler.setOpenCombobox(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          "opacity-0"
                                        )}
                                      />
                                      {framework}
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
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="participant_school_type">
                      Tingkat Pangkalan
                    </FormLabel>
                    <FormControl>
                      <Popover
                        open={state.openCombobox}
                        onOpenChange={() => handler.setOpenCombobox(true)}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={state.openCombobox}
                            className="justify-between"
                          >
                            Cari tingkat...
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Cari tingkat..." />
                            <CommandList>
                              <CommandEmpty>
                                tingkat tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {[
                                  "Hiking Penegak Putra",
                                  "Hiking Penegak Putri",
                                  "Hiking Penggalang Putra",
                                  "Hiking Penggalang Putri",
                                ].map((framework) => (
                                  <CommandItem
                                    key={framework}
                                    value={framework}
                                    onSelect={(currentValue) => {
                                      handler.setOpenCombobox(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        "opacity-0"
                                      )}
                                    />
                                    {framework}
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
                        checked={field.value}
                        {...handler.register("status")}
                        {...field}
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
                        checked={field.value}
                        {...handler.register("payment_status")}
                        {...field}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() =>
                    handler.setVisible({ show: false, title: "", type: 1 })
                  }
                  size="sm"
                >
                  Batal
                </Button>
                <Button size="sm" type="submit">
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
