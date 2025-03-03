import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type MascotType = {
  mascot_image: string | null;
};

type LogoType = {
  logo_image: string | null;
};

const schemeFormActivity = z.object({
  full_title: z.string().min(3).max(100),
  short_title: z.string().min(3).max(100),
  location: z.string().min(3).max(100),
  group_name: z.string().min(3).max(100),
});

const schemaFormImage = z.object({
  image: z
    .instanceof(File, {
      message: "Image is requires",
    })
    .refine(
      (file) => ["image/jpg", "image/jpeg", "image/png"].includes(file.type),
      { message: "Image type not allowed" }
    )
    .optional()
    .transform((file) => (file ? file : {})),
});

export default function Hook() {
  const [logo, setLogo] = useState<LogoType>();
  const [mascot, setMascot] = useState<MascotType>();

  const [isLoadingLogo, setIsLoadingLogo] = useState(false);
  const [isLoadingMascot, setIsLoadingMascot] = useState(false);
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);

  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });

  const formActivity = useForm<z.infer<typeof schemeFormActivity>>({
    resolver: zodResolver(schemeFormActivity),
    defaultValues: {
      full_title: "",
      short_title: "",
      location: "",
      group_name: "",
    },
  });

  const formImage = useForm<z.infer<typeof schemaFormImage>>({
    resolver: zodResolver(schemaFormImage),
    defaultValues: {
      image: {},
    },
  });

  const getLogo = async () => {
    setIsLoadingLogo(true);
    try {
      const response = await postData(API_PATH_CONSTANT.CMS.LOGO.SHOW, {});
      setLogo(response.data.data);
    } catch (error: any) {
    } finally {
      setIsLoadingLogo(false);
    }
  };

  const getMascot = async () => {
    setIsLoadingMascot(true);
    try {
      const response = await postData(API_PATH_CONSTANT.CMS.MASCOT.SHOW, {});
      setMascot(response.data.data);
    } catch (error: any) {
    } finally {
      setIsLoadingMascot(false);
    }
  };

  const getActivity = async () => {
    setIsLoadingActivity(true);
    try {
      const response = await postData(API_PATH_CONSTANT.CMS.ACTIVITY.SHOW, {});
      formActivity.setValue("full_title", response.data.data.full_title);
      formActivity.setValue("short_title", response.data.data.short_title);
      formActivity.setValue("location", response.data.data.location);
      formActivity.setValue("group_name", response.data.data.group_name);
    } catch (error: any) {
      formActivity.reset({
        full_title: "",
        short_title: "",
        location: "",
        group_name: "",
      });
    } finally {
      setIsLoadingActivity(false);
    }
  };

  const handleUpdateActivity = async (
    data: z.infer<typeof schemeFormActivity>
  ) => {
    setIsLoadingActivity(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.CMS.ACTIVITY.UPDATE,
        data
      );
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      getActivity();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingActivity(false);
    }
  };

  const handleUpdateMascot = async (data: z.infer<typeof schemaFormImage>) => {
    setIsLoadingMascot(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.CMS.MASCOT.UPDATE,
        { mascot_image: data.image },
        { "Content-Type": "multipart/form-data" }
      );
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      getMascot();
      formImage.reset();
      setVisible({ show: false, title: "", type: 1 });
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingMascot(false);
    }
  };

  const handleUpdateLogo = async (data: z.infer<typeof schemaFormImage>) => {
    setIsLoadingLogo(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.CMS.LOGO.UPDATE,
        { logo_image: data.image },
        { "Content-Type": "multipart/form-data" }
      );
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      getLogo();
      formImage.reset();
      setVisible({ show: false, title: "", type: 1 });
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingLogo(false);
    }
  };

  useEffect(() => {
    getLogo();
    getMascot();
    getActivity();
  }, []);

  return {
    state: {
      logo,
      mascot,
      isLoadingLogo,
      isLoadingMascot,
      isLoadingActivity,
      visible,
      formActivity,
      formImage,
    },
    handler: {
      setVisible,
      handleUpdateActivity,
      handleUpdateMascot,
      handleUpdateLogo,
    },
  };
}
