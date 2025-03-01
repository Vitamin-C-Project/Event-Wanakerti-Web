import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { toastRender } from "@/lib/alert";
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
      await postData(API_PATH_CONSTANT.CMS.CONTACT_US.CREATE, {
        ...data,
        full_name: data.name,
        phone: "8912345678",
        subject: "Pertanyaan Anonymous",
      });

      toastRender(
        API_CODE_CONSTANT.HTTP_OK,
        "Pesan berhasil terkirim, Terima Kasih 😊"
      );
      form.reset();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  return {
    state: { isLoadingForm, form },
    handler: { handleSubmit },
  };
}
