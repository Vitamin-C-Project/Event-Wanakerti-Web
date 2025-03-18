import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { IMeta } from "@/interfaces/common";
import {
  DivisionInterface,
  SCHOOL_TYPE,
} from "@/interfaces/division_interface";
import { toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Hook() {
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);

  const [divisions, setDivisions] = useState<DivisionInterface[]>([]);
  const [division, setDivision] = useState<DivisionInterface>();
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: 0,
  });
  const [metadata, setMetadata] = useState<IMeta>();
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });
  const [formData, setFormData] = useState({
    name: "",
    markings: [
      {
        id: "penilaian-1",
        name: "",
        children: [] as string[],
      },
    ],
    price: "",
  });

  const [errors, setErrors] = useState<{
    name: string;
    price: string;
    markings: { name?: string; children?: string[] }[];
  }>({
    name: "",
    price: "",
    markings: [],
  });

  const validateForm = () => {
    const newErrors: {
      name: string;
      price: string;
      markings: { name?: string; children?: string[] }[];
    } = {
      name: "",
      price: "",
      markings: [],
    };

    if (formData.name.length < 3 || formData.name.length > 100) {
      newErrors.name = "Nama harus memiliki 3-100 karakter";
    }

    if (formData.price.length < 3 || formData.price.length > 11) {
      newErrors.price = "Harga harus memiliki 3-11 karakter";
    }

    formData.markings.forEach((marking, index) => {
      const markingError: { name?: string; children?: string[] } = {};

      if (marking.name.length < 3 || marking.name.length > 100) {
        markingError.name = "Nama penilaian harus memiliki 3-100 karakter";
      }

      const childrenErrors: string | any[] | undefined = [];
      marking.children.forEach((child: string, childIndex: number) => {
        if (child.length < 3 || child.length > 100) {
          childrenErrors[childIndex] =
            "Sub penilaian harus memiliki 3-100 karakter";
        }
      });

      if (childrenErrors.length > 0) {
        markingError.children = childrenErrors;
      }

      if (Object.keys(markingError).length > 0) {
        newErrors.markings[index] = markingError;
      }
    });

    setErrors(newErrors);

    return (
      !newErrors.name &&
      !newErrors.price &&
      newErrors.markings.every((error) => !error)
    );
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMarkingChange = (index: number, value: string) => {
    const newMarkings = [...formData.markings];
    newMarkings[index].name = value;

    setFormData({
      ...formData,
      markings: newMarkings,
    });
  };

  const handleChildChange = (
    markingIndex: number,
    childIndex: number,
    value: any
  ) => {
    const newMarkings = [...formData.markings];
    newMarkings[markingIndex].children[childIndex] = value;

    setFormData({
      ...formData,
      markings: newMarkings,
    });
  };

  const addMarking = () => {
    setFormData({
      ...formData,
      markings: [
        ...formData.markings,
        {
          id: `penilaian-${formData.markings.length + 1}`,
          name: "",
          children: [],
        },
      ],
    });
  };

  const removeMarking = (index: number) => {
    const newMarkings = [...formData.markings];
    newMarkings.splice(index, 1);

    setFormData({
      ...formData,
      markings: newMarkings,
    });
  };

  const addChild = (markingIndex: number) => {
    const newMarkings = [...formData.markings];
    newMarkings[markingIndex].children.push("");

    setFormData({
      ...formData,
      markings: newMarkings,
    });
  };

  const removeChild = (markingIndex: number, childIndex: number) => {
    const newMarkings = [...formData.markings];
    newMarkings[markingIndex].children.splice(childIndex, 1);

    setFormData({
      ...formData,
      markings: newMarkings,
    });
  };

  const getDivisions = async () => {
    setIsLoadingData(true);
    try {
      const response = await postData(API_PATH_CONSTANT.DIVISION.LIST, {
        ...filters,
        ...pagination,
      });
      setDivisions(response.data.data);
      setMetadata(response.data.pagination);
    } catch (error) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoadingForm(true);
      try {
        const response = await postData(
          API_PATH_CONSTANT.DIVISION.CREATE,
          formData
        );
        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
        resetState();
        getDivisions();
      } catch (error: any) {
        toastRender(error.status, error.response.data.messages);
      } finally {
        setIsLoadingForm(false);
      }
    }
  };

  const handleEdit = (data: DivisionInterface) => {
    setDivision(data);
    setFormData({
      name: data.name,
      markings: data.criteria_markings?.map((marking, index) => ({
        id: `penilaian-${index + 1}`,
        name: marking.name,
        children: marking.children?.map((child) => child.name) || [],
      })),
      price: data.price.toString(),
    });

    setVisible({ show: true, title: `Edit ${data.name}`, type: 2 });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoadingForm(true);
      try {
        const response = await postData(API_PATH_CONSTANT.DIVISION.UPDATE, {
          ...formData,
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
    setVisible({ show: false, title: "", type: 1 });
    setFormData({
      name: "",
      markings: [
        {
          id: "penilaian-1",
          name: "",
          children: [] as string[],
        },
      ],
      price: "",
    });
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
      schoolTypes: SCHOOL_TYPE,
      openCombobox,
      isLoadingData,
      showFilter,
      pagination,
      formData,
      errors,
      metadata,
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
      validateForm,
      handleInputChange,
      handleMarkingChange,
      handleChildChange,
      addMarking,
      removeMarking,
      addChild,
      removeChild,
    },
  };
}
