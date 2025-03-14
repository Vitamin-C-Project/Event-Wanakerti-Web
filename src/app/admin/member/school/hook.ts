import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { USER_TYPE_CONSTANT } from "@/constants/global_constant";
import { SCHOOL_TYPE } from "@/interfaces/division_interface";
import { ParticipantSchoolInterface } from "@/interfaces/participant_interface";
import { UserInterface } from "@/interfaces/user_interface";
import { toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  user: z.string(),
  name: z.string().min(3).max(100),
  email: z.string().email(),
  address: z.string().min(3).max(200),
  phone_number: z.string().min(8).max(15),
  person_responsible: z.string().min(3).max(100),
  participant_school_type: z.string(),
});

export default function Hook() {
  const { "0": params } = useSearchParams();
  const navigate = useNavigate();

  const [openComboboxUser, setOpenComboboxUser] = useState(false);
  const [openComboboxSchool, setOpenComboboxSchool] = useState(false);
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [showFilter, setShowFilter] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [schools, setSchools] = useState<ParticipantSchoolInterface[]>([]);
  const [school, setSchool] = useState<ParticipantSchoolInterface>();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [user, setUser] = useState<UserInterface>();
  const [filters, setFilters] = useState<{
    search: string;
    type?: number;
  }>({
    search: params.get("search") || "",
    type: params.get("type") ? Number(params.get("type")) : 0,
  });
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      user: "",
      name: "",
      email: "",
      address: "",
      phone_number: "",
      person_responsible: "",
      participant_school_type: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.SCHOOL.CREATE,
        {
          user_id: user?.id,
          name: data.name,
          email: data.email,
          person_responsible: data.person_responsible,
          address: data.address,
          phone_number: data.phone_number,
          school_type_id: data.participant_school_type,
        }
      );

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getSchools();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleEdit = (data: ParticipantSchoolInterface) => {
    setUser(data.user);
    setSchool(data);
    form.reset({
      user: data.user.id?.toString(),
      name: data.name,
      email: data.email,
      address: data.address,
      phone_number: data.phone_number,
      person_responsible: data.person_responsible,
      participant_school_type: data.school_type.id?.toString(),
    });
    setVisible({ show: true, title: `Edit Pangkalan ${data.name}`, type: 2 });
  };

  const handleUpdate = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.SCHOOL.UPDATE,
        {
          user_id: user?.id,
          name: data.name,
          email: data.email,
          person_responsible: data.person_responsible,
          address: data.address,
          phone_number: data.phone_number,
          school_type_id: data.participant_school_type,
          uid: school?.id,
        }
      );
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getSchools();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleDelete = (data: ParticipantSchoolInterface) => {
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

        const response = await postData(
          API_PATH_CONSTANT.PARTICIPANT.SCHOOL.DELETE,
          {
            uid: data?.id,
          }
        );
        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
        getSchools();
      }
    });
  };

  const getSchools = async () => {
    setIsLoadingData(true);
    try {
      let filterCustom: { [key: string]: any } = {
        ...filters,
        school_type_id: Number(filters.type),
      };

      if (filterCustom.school_type_id! < 1) {
        delete filterCustom.school_type_id;
      }

      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.SCHOOL.LIST,
        {
          ...pagination,
          ...filterCustom,
        }
      );

      setSchools(response.data.data);
    } catch (error) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await postData(API_PATH_CONSTANT.USER.LIST, {
        role_id: USER_TYPE_CONSTANT.PARTICIPANT,
        search: "",
      });
      setUsers(response.data.data);
    } catch (error) {}
  };

  const resetState = () => {
    setVisible({ show: false, title: "", type: 1 });
    form.reset({
      user: "",
      name: "",
      email: "",
      address: "",
      phone_number: "",
      person_responsible: "",
      participant_school_type: "",
    });
    setUser(undefined);
    setShowFilter(false);
  };

  const appliedFilters = (e: any) => {
    e.preventDefault();

    let params = [`search=${filters.search}`, `type=${filters.type}`].join("&");

    setShowFilter(false);
    navigate(`?${params}`);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getSchools();
  }, [pagination, params]);

  return {
    state: {
      schools,
      form,
      isLoadingForm,
      visible,
      schoolTypes: SCHOOL_TYPE,
      openComboboxUser,
      openComboboxSchool,
      users,
      user,
      isLoadingData,
      showFilter,
      pagination,
      filters,
    },
    handler: {
      setVisible,
      handleSubmit,
      handleEdit,
      handleDelete,
      handleUpdate,
      setOpenComboboxUser,
      setOpenComboboxSchool,
      resetState,
      setUser,
      setShowFilter,
      setFilters,
      setPagination,
      appliedFilters,
    },
  };
}
