import { Container, Flex, Heading } from "@radix-ui/themes";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Hook from "./hook";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Send } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function RegisterSchool({ title }: { title: string }) {
  const { state, handler } = Hook();

  return (
    <Container size={"2"} align={"center"}>
      <Flex align={"center"} justify={"between"} className="mb-5">
        <Heading>{title}</Heading>
      </Flex>

      <Card className="shadow-none">
        <Form {...state.form}>
          <form onSubmit={state.form.handleSubmit(handler.handleSubmit)}>
            <CardContent className={cn("flex flex-col gap-5 mb-5")}>
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
                              <CommandEmpty>Akun tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {state.schoolTypes.map((type) => (
                                  <CommandItem
                                    key={type.VALUE}
                                    value={type.VALUE}
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
                                    {type.VALUE}
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
            </CardContent>
            <CardFooter className="justify-end">
              <Button size="sm" type="submit">
                <Send /> Kirim
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </Container>
  );
}
