import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schemaForm = z.object({
  email: z.string().email().min(3).max(150),
});
export default function Hook() {
  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      email: "",
    },
  });

  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);

    try {
      const response = await postData(
        API_PATH_CONSTANT.AUTH.FORGOT_PASSWORD,
        data
      );

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      form.reset();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  return {
    state: { form, isLoadingForm },
    handler: { handleSubmit },
  };
}
