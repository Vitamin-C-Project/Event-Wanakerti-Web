import { columns } from "./columns";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Heading } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { DataTable } from "./data-table";

export default function ParticipantPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout>
      <Flex align={"center"} justify={"between"}>
        <Heading>Data Peserta</Heading>
        <Button
          onClick={() =>
            handler.setVisible({
              show: true,
              type: 1,
              title: "Tambah Peserta Baru",
            })
          }
        >
          <Plus /> Tambah Baru
        </Button>
      </Flex>

      <DataTable
        columns={columns({
          delete: handler.handleDelete,
        })}
        data={state.members}
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
                            />
                            <CommandList>
                              <CommandEmpty>Tim tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {state.teams.map((team) => (
                                  <CommandItem
                                    key={team.id}
                                    value={team.id?.toString()}
                                    onSelect={(currentValue) => {
                                      handler.setOpenCombobox(false);
                                      field.onChange(currentValue);
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
