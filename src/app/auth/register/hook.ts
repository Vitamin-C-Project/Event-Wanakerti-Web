import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { alertRender, toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().min(3).max(150),
  password: z.string().min(3).max(100),
});

export default function Hook() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);

    try {
      let response = await postData(API_PATH_CONSTANT.AUTH.REGISTER, data);

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      navigate("/auth/login");
    } catch (error: any) {
      alertRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const checkToken = () => {
    const token = jsCookie.get("LJJKPW");
    if (token) navigate("/dashboard");
  };

  useEffect(() => {
    checkToken();
  }, []);

  return {
    state: { form, isLoadingForm },
    handler: { handleSubmit },
  };
}
