import { API_PATH_CONSTANT } from "@/constants/api_constant";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schemaForm = z.object({
  url: z.string().url(),
});

export default function Hook() {
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      url: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
    } catch (error: any) {
    } finally {
      setIsLoadingForm(false);
    }
  };

  const getVideo = async () => {
    setIsLoadingData(true);
    try {
      const response = await postData(API_PATH_CONSTANT.CMS.VIDEO.SHOW, {});
      console.log(response);
    } catch (error: any) {
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  return {
    state: { visible, form },
    handler: { setVisible, handleSubmit },
  };
}
