import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const schemaForm = z.object({
  password: z.string().min(3).max(100),
  password_confirmation: z.string().min(3).max(100),
});

export default function Hook() {
  const { "0": params } = useSearchParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);

    try {
      const response = await postData(API_PATH_CONSTANT.AUTH.RESET_PASSWORD, {
        token: params.get("token"),
        email: params.get("email"),
        ...data,
      });

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      navigate("/auth/login");
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
      navigate("/auth/login");
    } finally {
      setIsLoadingForm(false);
    }
  };

  useEffect(() => {
    if (!params.get("token") || !params.get("email")) {
      navigate("/auth/login");
    }
  }, [params]);

  return {
    state: {
      form,
      isLoadingForm,
    },
    handler: {
      handleSubmit,
    },
  };
}
