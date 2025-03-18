import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { BrandInterface } from "@/interfaces/cms_interface";
import { IMeta } from "@/interfaces/common";
import { toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
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
  const [visible, setVisible] = useState({
    show: false,
    type: 1,
    title: "",
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [brands, setBrands] = useState<BrandInterface[]>([]);
  const [filters, setFilters] = useState({
    search: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
  });
  const [metadata, setMetadata] = useState<IMeta>();

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "",
      image: {},
    },
  });

  const getBrands = async () => {
    setIsLoadingData(true);

    try {
      const response = await postData(API_PATH_CONSTANT.CMS.BRAND.LIST, {
        ...filters,
        ...pagination,
      });

      setBrands(response.data.data);
      setMetadata(response.data.pagination);
    } catch (error) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.CMS.BRAND.CREATE,
        {
          ...data,
        },
        {
          "Content-Type": "multipart/form-data",
        }
      );

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      form.reset();
      setVisible({ show: false, title: "", type: 1 });
      getBrands();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleDelete = async (data: BrandInterface) => {
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

        const response = await postData(API_PATH_CONSTANT.CMS.BRAND.DELETE, {
          uid: data?.id,
        });

        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);

        getBrands();
      }
    });
  };

  useEffect(() => {
    getBrands();
  }, [filters, pagination]);

  return {
    state: {
      brands,
      visible,
      form,
      isLoadingData,
      isLoadingForm,
      metadata,
      filters,
      pagination,
    },
    handler: {
      setVisible,
      handleSubmit,
      handleDelete,
      setFilters,
      setPagination,
    },
  };
}
