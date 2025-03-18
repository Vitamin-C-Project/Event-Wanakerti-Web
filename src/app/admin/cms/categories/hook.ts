import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { CategoryInterface } from "@/interfaces/cms_interface";
import { IMeta } from "@/interfaces/common";
import { SchoolTypeInterface } from "@/interfaces/division_interface";
import { toastRender } from "@/lib/alert";
import { formatCurrency, postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  description: z.string().min(3).max(200),
  type_id: z.string(),
  price: z.string().min(3).max(11),
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
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [category, setCategory] = useState<CategoryInterface>();
  const [schoolTypes, setSchoolTypes] = useState<SchoolTypeInterface[]>([]);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      description: "",
      type_id: "",
      image: {},
      price: "",
    },
  });

  const [visible, setVisible] = useState({
    show: false,
    type: 1,
    title: "",
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });
  const [filters, setFilters] = useState({
    school_type_id: "",
  });
  const [metadata, setMetadata] = useState<IMeta>();

  const getCategories = async () => {
    setIsLoadingData(true);
    try {
      if (Number(filters.school_type_id) < 1) {
        delete filters.school_type_id;
      }

      const response = await postData(API_PATH_CONSTANT.CMS.CATEGORY.LIST, {
        ...pagination,
        ...filters,
      });
      setCategories(response.data.data);
      setMetadata(response.data.pagination);
    } catch (error: any) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const getSchoolTypes = async () => {
    try {
      const response = await postData(API_PATH_CONSTANT.SCHOOL_TYPE.LIST, {});
      setSchoolTypes(response.data.data);
    } catch (error: any) {}
  };

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.CMS.CATEGORY.CREATE,
        {
          name: data.description,
          ...data,
        },
        {
          "Content-Type": "multipart/form-data",
        }
      );

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getCategories();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleEdit = (data: CategoryInterface) => {
    setCategory(data);
    form.reset({
      description: data.description,
      price: data.price.toString(),
      type_id: data.school_type.id?.toString(),
    });
    setVisible({
      show: true,
      title: `Edit Kategori ${data.school_type.name}`,
      type: 2,
    });
  };

  const handleUpdate = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.CMS.CATEGORY.UPDATE,
        {
          name: data.description,
          ...data,
          uid: category?.id,
        },
        {
          "Content-Type": "multipart/form-data",
        }
      );

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getCategories();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleDelete = (data: CategoryInterface) => {
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

        const response = await postData(API_PATH_CONSTANT.CMS.CATEGORY.DELETE, {
          uid: data?.id,
        });

        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);

        getCategories();
      }
    });
  };

  const resetState = () => {
    setVisible({ show: false, title: "", type: 1 });
    form.reset({
      description: "",
      type_id: "",
      image: {},
      price: "",
    });
    setCategory(undefined);
  };

  useEffect(() => {
    getCategories();
  }, [pagination, filters]);

  useEffect(() => {
    getSchoolTypes();
  }, []);

  return {
    state: {
      categories,
      visible,
      pagination,
      isLoadingForm,
      isLoadingData,
      schoolTypes,
      form,
      category,
      metadata,
      filters,
    },
    handler: {
      setVisible,
      setPagination,
      handleSubmit,
      resetState,
      formatCurrency,
      handleEdit,
      handleUpdate,
      handleDelete,
      setFilters,
    },
  };
}
