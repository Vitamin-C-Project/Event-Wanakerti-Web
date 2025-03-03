import { DataTable } from "@/components/data-table";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Heading } from "@radix-ui/themes";
import { columns } from "./columns";
import { CategoryInterface } from "@/interfaces/cms_interface";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import Hook from "./hook";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function CategoriesPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <Flex align={"center"} justify={"between"}>
        <Heading>Kategori Lomba</Heading>
        <Button
          onClick={() =>
            handler.setVisible({
              show: true,
              type: 1,
              title: "Tambah Kategori Baru",
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
        data={state.categories}
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
              className="space-y-4"
              onSubmit={
                state.visible.type == 1
                  ? state.form.handleSubmit(handler.handleSubmit)
                  : state.form.handleSubmit(handler.handleUpdate)
              }
            >
              <FormField
                control={state.form.control}
                name="division_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="url">Divisi</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        disabled={state.isLoadingForm}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              state.visible.type == 1
                                ? field.value || "Pilih Divisi"
                                : state.category?.division?.name ||
                                  "Pilih Divisi"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {state.disivions.map((division) => (
                              <SelectItem value={division.id?.toString()}>
                                {division.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={state.form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Deskripsi"
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="image">Upload Gambar</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={state.isLoadingForm}
                        onChange={(event: any) => {
                          field.onChange(event.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {state.visible.type == 2 && (
                <img
                  src={state.category?.image}
                  alt={state.category?.division?.name}
                  className="w-full"
                />
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handler.resetState()}
                  >
                    Tutup
                  </Button>
                </DialogClose>
                <Button variant="default" type="submit">
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
