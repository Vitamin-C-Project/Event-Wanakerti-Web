import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import {
  DivisionInterface,
  SCHOOL_TYPE,
} from "@/interfaces/division_interface";
import { toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
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
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: 0,
  });
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });

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
      markings: data.criteria_markings.map((marking) => marking.name),
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
    form.reset({
      name: "",
      markings: [],
      price: "",
    });
    setVisible({ show: false, title: "", type: 1 });
    setShowFilter(false);
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
      showFilter,
      pagination,
    },
    handler: {
      setVisible,
      handleSubmit,
      handleEdit,
      handleDelete,
      setOpenCombobox,
      resetState,
      handleUpdate,
      setShowFilter,
      setPagination,
    },
  };
}
