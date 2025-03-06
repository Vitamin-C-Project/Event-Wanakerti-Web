import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { USER_TYPE_CONSTANT } from "@/constants/global_constant";
import { SCHOOL_TYPE } from "@/interfaces/division_interface";
import { ParticipantSchoolInterface } from "@/interfaces/participant_interface";
import { UserInterface } from "@/interfaces/user_interface";
import { alertSuccess, toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
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
  const [openComboboxUser, setOpenComboboxUser] = useState(false);
  const [openComboboxSchool, setOpenComboboxSchool] = useState(false);
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [schools, setSchools] = useState<ParticipantSchoolInterface[]>([]);
  const [school, setSchool] = useState<ParticipantSchoolInterface>();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [user, setUser] = useState<UserInterface>();

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
    console.log(data);
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
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.SCHOOL.LIST,
        {}
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
  };

  useEffect(() => {
    getUser();
    getSchools();
  }, []);

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
    },
  };
}
