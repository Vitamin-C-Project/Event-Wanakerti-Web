import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { USER_TYPE_CONSTANT } from "@/constants/global_constant";
import { IMeta } from "@/interfaces/common";
import { UserInterface } from "@/interfaces/user_interface";
import { alertRender, alertSuccess, toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().min(3).max(150),
  password: z.string().nullable(),
});

export default function Hook() {
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [metadata, setMetadata] = useState<IMeta>();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [user, setUser] = useState<UserInterface>();
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
  });
  const [filters, setFilters] = useState({
    search: "",
  });

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "",
      email: "",
      password: "LJJKPW" + Math.round(Math.random() * 10000),
    },
  });

  const getUsers = async () => {
    setIsLoadingData(true);

    try {
      const response = await postData(API_PATH_CONSTANT.USER.LIST, {
        ...pagination,
        ...filters,
        role_id: USER_TYPE_CONSTANT.ADMIN,
      });

      setUsers(response.data.data);
      setMetadata(response.data.pagination);
    } catch (error) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(API_PATH_CONSTANT.USER.CREATE, {
        ...data,
        role_id: USER_TYPE_CONSTANT.ADMIN,
      });
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getUsers();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleEdit = (data: UserInterface) => {
    form.reset({ email: data.email, name: data.name, password: "" });
    setUser(data);
    setVisible({ show: true, title: `Edit Akun ${data.name}`, type: 2 });
  };

  const handleEditPassword = (data: UserInterface) => {
    form.reset({ email: data.email, name: data.name, password: "" });
    setUser(data);
    setVisible({ show: true, title: `Ubah Password ${data.name}`, type: 3 });
  };

  const handleUpdate = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(API_PATH_CONSTANT.USER.UPDATE, {
        ...data,
        uid: user?.id,
      });
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getUsers();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleUpdatePassword = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(API_PATH_CONSTANT.USER.UPDATE_PASSWORD, {
        ...data,
        password_confirmation: data.password,
        uid: user?.id,
      });
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getUsers();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleDelete = async (data: UserInterface) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikannya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, dihapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoadingData(true);

        const response = await postData(API_PATH_CONSTANT.USER.DELETE, {
          uid: data?.id,
        });

        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);

        getUsers();
      }
    });
  };

  const resetState = () => {
    setVisible({ show: false, title: "", type: 1 });
    form.reset({
      name: "",
      email: "",
      password: "LJJKPW" + Math.round(Math.random() * 10000),
    });
  };

  useEffect(() => {
    getUsers();
  }, [pagination, filters]);

  return {
    state: {
      visible,
      users,
      form,
      isLoadingForm,
      pagination,
      metadata,
      isLoadingData,
      filters,
    },
    handler: {
      setVisible,
      handleSubmit,
      handleEdit,
      handleDelete,
      handleUpdate,
      handleEditPassword,
      handleUpdatePassword,
      setPagination,
      resetState,
      setFilters,
    },
  };
}
