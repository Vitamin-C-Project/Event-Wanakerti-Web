import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { UserInterface } from "@/interfaces/user_interface";
import { toastRender } from "@/lib/alert";
import { useAppDispatch } from "@/lib/hooks";
import { setUserAuthenticated } from "@/lib/slices/user_slice";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().min(3).max(150),
});

const schemaPassword = z.object({
  password: z.string().min(3).max(100),
  password_confirmation: z.string().min(3).max(100),
});

export default function Hook() {
  const formProfile = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const formPassword = useForm<z.infer<typeof schemaPassword>>({
    resolver: zodResolver(schemaPassword),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const [user, setUser] = useState<UserInterface>();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const dispatch = useAppDispatch();

  const getUserAuth = async () => {
    setIsLoadingProfile(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.AUTH.CHECK_AUTHENTICATED,
        {}
      );

      setUser(response.data.data);
      dispatch(setUserAuthenticated(response.data.data));
      formProfile.setValue("name", response.data.data.name);
      formProfile.setValue("email", response.data.data.email);
    } catch (error) {
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleUpdateProfile = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingProfile(true);

    try {
      const response = await postData(API_PATH_CONSTANT.USER.UPDATE, {
        ...data,
        uid: user?.id,
      });

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      getUserAuth();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleUpdatePassword = async (data: z.infer<typeof schemaPassword>) => {
    setIsLoadingPassword(true);

    try {
      const response = await postData(API_PATH_CONSTANT.USER.UPDATE_PASSWORD, {
        ...data,
        password_confirmation: data.password,
        uid: user?.id,
      });

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      getUserAuth();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingPassword(false);
    }
  };

  useEffect(() => {
    getUserAuth();
  }, []);

  return {
    state: {
      formProfile,
      formPassword,
      isLoadingProfile,
      isLoadingPassword,
    },
    handler: {
      handleUpdateProfile,
      handleUpdatePassword,
    },
  };
}
