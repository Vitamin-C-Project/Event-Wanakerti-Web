import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { USER_TYPE_CONSTANT } from "@/constants/global_constant";
import { IMeta } from "@/interfaces/common";
import {
  DivisionInterface,
  MarkingInterface,
} from "@/interfaces/division_interface";
import { UserInterface } from "@/interfaces/user_interface";
import { toastRender } from "@/lib/alert";
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
  criteria_id: z.string(),
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
  const [divisions, setDivisions] = useState<DivisionInterface[]>([]);
  const [markings, setMarkings] = useState<MarkingInterface[]>([]);

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
        role_id: USER_TYPE_CONSTANT.JUDGE,
      });

      setUsers(response.data.data);
      setMetadata(response.data.pagination);
    } catch (error) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const getDivisions = async () => {
    try {
      const response = await postData(API_PATH_CONSTANT.DIVISION.LIST, {
        with: ["criteriaMarkings"],
      });
      setDivisions(response.data.data);
    } catch (error) {}
  };

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(API_PATH_CONSTANT.USER.CREATE, {
        ...data,
        role_id: USER_TYPE_CONSTANT.JUDGE,
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
    setMarkings(
      divisions.find((div) => div.id === data.marking?.division_id)
        ?.criteria_markings || []
    );
    form.reset({
      email: data.email,
      name: data.name,
      password: "",
      criteria_id: data.marking?.id?.toString(),
    });
    setUser(data);
    setVisible({ show: true, title: `Edit Akun ${data.name}`, type: 2 });
  };

  const handleEditPassword = (data: UserInterface) => {
    form.reset({
      email: data.email,
      name: data.name,
      password: "",
      criteria_id: data.marking?.id?.toString(),
    });
    setUser(data);
    setVisible({ show: true, title: `Ubah Password ${data.name}`, type: 3 });
  };

  const handleUpdate = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(API_PATH_CONSTANT.USER.UPDATE, {
        ...data,
        uid: user?.id,
        role_id: USER_TYPE_CONSTANT.JUDGE,
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
      confirmButtonColor: "#603F26",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
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
      criteria_id: "",
    });
  };

  useEffect(() => {
    getUsers();
  }, [pagination, filters]);

  useEffect(() => {
    getDivisions();
  }, []);

  return {
    state: {
      visible,
      users,
      form,
      isLoadingForm,
      pagination,
      metadata,
      isLoadingData,
      divisions,
      markings,
      user,
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
      setMarkings,
      setFilters,
    },
  };
}
