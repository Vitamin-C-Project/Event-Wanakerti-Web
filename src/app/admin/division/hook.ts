import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import {
  DivisionInterface,
  SCHOOL_TYPE,
} from "@/interfaces/division_interface";
import { alertSuccess, toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
  school_type: z.string(),
  markings: z.array(z.string()),
  price: z.string().min(3).max(11),
});

export default function Hook() {
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "",
      school_type: "",
      markings: [],
      price: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "markings",
  });

  const [divisions, setDivisions] = useState<DivisionInterface[]>([]);
  const [division, setDivision] = useState<DivisionInterface>();

  const getDivisions = async () => {
    setIsLoadingData(true);
    try {
      const response = await postData(API_PATH_CONSTANT.DIVISION.LIST, {});
      setDivisions(response.data.data);
    } catch (error) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);

    try {
      const response = await postData(API_PATH_CONSTANT.DIVISION.CREATE, {
        ...data,
        school_type_id: data.school_type,
      });

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getDivisions();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleEdit = (data: DivisionInterface) => {
    setDivision(data);
    form.reset({
      name: data.name,
      school_type: data.school_type?.id?.toString(),
      markings: data.markings,
      price: data.price.toString(),
    });
    setVisible({ show: true, title: `Edit ${data.name}`, type: 2 });
  };

  const handleUpdate = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(API_PATH_CONSTANT.DIVISION.UPDATE, {
        ...data,
        uid: division?.id,
        school_type_id: data.school_type,
      });
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getDivisions();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleDelete = (data: DivisionInterface) => {
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
        const response = await postData(API_PATH_CONSTANT.DIVISION.DELETE, {
          uid: data?.id,
        });
        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
        getDivisions();
      }
    });
  };

  const resetState = () => {
    form.reset();
    setVisible({ show: false, title: "", type: 1 });
  };

  useEffect(() => {
    getDivisions();
  }, []);

  return {
    state: {
      divisions,
      visible,
      isLoadingForm,
      form,
      schoolTypes: SCHOOL_TYPE,
      formMarking: { fields, append, remove },
      openCombobox,
      isLoadingData,
    },
    handler: {
      setVisible,
      handleSubmit,
      handleEdit,
      handleDelete,
      setOpenCombobox,
      resetState,
      handleUpdate,
    },
  };
}
