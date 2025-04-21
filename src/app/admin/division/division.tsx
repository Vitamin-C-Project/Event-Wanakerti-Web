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
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Filter, Loader2, Plus, X } from "lucide-react";
import DashboardLayout from "@/layout/dashboard-layout";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { DataTablePagination } from "@/components/pagination-datatable";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <Heading>Data Bidang Lomba</Heading>

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
                title: "Tambah Bidang Lomba Baru",
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
          data={state.divisions}
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
        <DialogContent className="p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>{state.visible.title}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={
              state.visible.type == 1
                ? handler.handleSubmit
                : handler.handleUpdate
            }
          >
            <ScrollArea className="sm:h-[70vh] h-[50vh] w-full space-y-4 px-6">
              <div className="form-group mb-4">
                <label htmlFor="name" className="block mb-1">
                  Nama
                </label>
                <Input
                  name="name"
                  value={state.formData.name}
                  onChange={handler.handleInputChange}
                />
                {state.errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {state.errors.name}
                  </p>
                )}
              </div>

              <div className="form-group mb-4">
                <label htmlFor="price" className="block mb-1">
                  Harga
                </label>
                <Input
                  name="price"
                  value={state.formData.price}
                  onChange={handler.handleInputChange}
                />
                {state.errors.price && (
                  <p className="text-red-600 text-sm mt-1">
                    {state.errors.price}
                  </p>
                )}
              </div>

              <div className="form-group mb-4">
                <label className="block mb-1">Penilaian</label>
                <div className="mb-2 space-y-3">
                  {state.formData.markings.map((marking, index) => (
                    <div key={marking.id} className="border p-3 rounded-lg">
                      <Flex gap={"2"} align={"center"}>
                        <Input
                          type="text"
                          value={marking.name}
                          onChange={(e) =>
                            handler.handleMarkingChange(index, e.target.value)
                          }
                          placeholder={`Penilaian ${index + 1}`}
                        />

                        <X
                          className=" text-red-600 cursor-pointer ms-3"
                          display={state.isLoadingForm ? "none" : "block"}
                          onClick={() => handler.removeMarking(index)}
                        />
                      </Flex>

                      {state.errors.markings[index]?.name && (
                        <p className="text-red-600 text-sm mt-1">
                          {state.errors.markings[index].name}
                        </p>
                      )}

                      {/* Sub Penilaian */}
                      <div className="ml-4 mt-2 space-y-2">
                        {marking.children.map((child, childIndex) => (
                          <Flex
                            gap={"2"}
                            align={"center"}
                            key={`${marking.id}-child-${childIndex}`}
                          >
                            <Input
                              type="text"
                              value={child}
                              onChange={(e) =>
                                handler.handleChildChange(
                                  index,
                                  childIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`Sub Penilaian ${childIndex + 1}`}
                            />
                            <X
                              className=" text-red-600 cursor-pointer ms-3"
                              display={state.isLoadingForm ? "none" : "block"}
                              onClick={() =>
                                handler.removeChild(index, childIndex)
                              }
                            />
                          </Flex>
                        ))}

                        <Button
                          type="button"
                          disabled={state.isLoadingForm}
                          onClick={() => handler.addChild(index)}
                        >
                          Tambah Sub Penilaian
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    onClick={handler.addMarking}
                    disabled={state.isLoadingForm}
                  >
                    Tambah Penilaian
                  </Button>
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="justify-content-between p-5">
              {state.isLoadingForm ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
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
          {/* <Form {...state.form}>
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
                {state.isLoadingForm ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
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
          </Form> */}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
