import { API_PATH_CONSTANT } from "@/constants/api_constant";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().min(3).max(150),
  message: z.string().min(3).max(200),
});

export default function Hook() {
  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      // const response = await postData(API_PATH_CONSTANT.)
    } catch (error: any) {
    } finally {
      setIsLoadingForm(false);
    }
  };

  return {
    state: { isLoadingForm, form },
    handler: { handleSubmit },
  };
}
