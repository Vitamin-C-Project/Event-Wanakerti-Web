import { Flex } from "@radix-ui/themes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Hook from "./hook";

export default function RegisterSchool() {
  const { state, handler } = Hook();

  return (
    <div>
      <Card className="shadow-none">
        <CardHeader className="border-b-2 pb-5">
          <CardTitle>Registrasi Pangkalan</CardTitle>
        </CardHeader>
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
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger
                          className="w-full"
                          disabled={state.isLoadingForm}
                        >
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {state.schoolTypes.map((item) => (
                              <SelectItem
                                value={item.KEY.toString()}
                                key={item.KEY}
                              >
                                {item.VALUE}
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
              {state.isLoadingForm && (
                <Button disabled type="submit">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
              )}
              {!state.isLoadingForm && (
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Kirim
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
