import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { VideoInterface } from "@/interfaces/cms_interface";
import { toastRender } from "@/lib/alert";
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
  const [video, setVideo] = useState<VideoInterface>();

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      url: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(API_PATH_CONSTANT.CMS.VIDEO.UPDATE, {
        video_url: data.url,
      });

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      setVisible({ show: false, title: "", type: 1 });
      getVideo();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const getVideo = async () => {
    setIsLoadingData(true);
    try {
      const response = await postData(API_PATH_CONSTANT.CMS.VIDEO.SHOW, {});

      setVideo({
        url: response.data.data.video_url,
      });
    } catch (error: any) {
      setVideo({
        url: "https://www.youtube.com/embed/tgbNymZ7vqY",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  return {
    state: { visible, form, video, isLoadingForm, isLoadingData },
    handler: { setVisible, handleSubmit },
  };
}
