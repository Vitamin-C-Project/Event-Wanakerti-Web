import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { USER_TYPE_CONSTANT } from "@/constants/global_constant";
import { DivisionInterface } from "@/interfaces/division_interface";
import {
  ParticipantSchoolInterface,
  ParticipantTeamInterface,
} from "@/interfaces/participant_interface";
import { alertSuccess, toastRender } from "@/lib/alert";
import { useAppSelector } from "@/lib/hooks";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  school: z.string(),
  division: z.string(),
  name: z.string().min(3).max(100),
  status: z.boolean(),
  payment_status: z.boolean(),
});

export default function Hook() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userAuthenticated);

  const [openComboboxSchool, setOpenComboboxSchool] = useState(false);
  const [openComboboxDivision, setOpenComboboxDivision] = useState(false);
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [schools, setSchools] = useState<ParticipantSchoolInterface[]>([]);
  const [school, setSchool] = useState<ParticipantSchoolInterface>();
  const [divisions, setDivisions] = useState<DivisionInterface[]>([]);
  const [division, setDivision] = useState<DivisionInterface>();
  const [teams, setTeams] = useState<ParticipantTeamInterface[]>([]);
  const [team, setTeam] = useState<ParticipantTeamInterface>();
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: 0,
  });
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });

  const { register } = useForm();

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      school: "",
      division: "",
      name: "",
      payment_status: false,
      status: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);

    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.TEAM.CREATE,
        {
          ...data,
          division_id: data.division,
          school_id: data.school,
        }
      );
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getTeams();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleEdit = (data: ParticipantTeamInterface) => {
    form.reset({
      name: data.name,
      division: data.division.id?.toString(),
      school: data.school.id?.toString(),
      payment_status: data.payment_status == 1 ? true : false,
      status: data.status == 1 ? true : false,
    });
    setDivision(data.division);
    setSchool(data.school);
    setVisible({ show: true, title: `Edit Team ${data.name}`, type: 2 });
    setTeam(data);
    getDivisions(data.school);
  };

  const handleUpdate = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.TEAM.UPDATE,
        {
          ...data,
          division_id: data.division,
          school_id: data.school,
          uid: team?.id,
        }
      );
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      resetState();
      getTeams();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleUpdateReRegistration = async (data: ParticipantTeamInterface) => {
    setIsLoadingData(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.TEAM.UPDATE_STATUS_RE_REGISTRATION,
        {
          teams: [{ id: data?.id, re_registration_status: 1 }],
        }
      );
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      getTeams();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleDelete = (data: ParticipantTeamInterface) => {
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
          API_PATH_CONSTANT.PARTICIPANT.TEAM.DELETE,
          {
            uid: data?.id,
          }
        );
        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
        getTeams();
      }
    });
  };

  const getSchools = async () => {
    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.SCHOOL.LIST,
        {}
      );

      setSchools(response.data.data);
    } catch (error) {}
  };

  const getDivisions = async (school: ParticipantSchoolInterface) => {
    try {
      const response = await postData(API_PATH_CONSTANT.DIVISION.LIST, {});

      setDivisions(response.data.data);
    } catch (error) {}
  };

  const getTeams = async () => {
    setIsLoadingData(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.TEAM.LIST,
        {}
      );
      setTeams(response.data.data);
    } catch (error) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const resetState = () => {
    setVisible({ show: false, title: "", type: 1 });
    form.reset();
    setSchool(undefined);
    setDivision(undefined);
    setShowFilter(false);
  };

  useEffect(() => {
    getSchools();
    getTeams();

    if (
      [USER_TYPE_CONSTANT.PARTICIPANT].includes(user?.role?.id!) &&
      !user.school
    ) {
      navigate("/dashboard");
    }

    if ([USER_TYPE_CONSTANT.PARTICIPANT].includes(user?.role?.id!)) {
      form.setValue("school", user?.school?.id?.toString() || "");
      getDivisions(user?.school!);
    }
  }, []);

  return {
    state: {
      user,
      teams,
      form,
      isLoadingForm,
      visible,
      location,
      isLoadingData,
      openComboboxSchool,
      openComboboxDivision,
      schools,
      school,
      divisions,
      division,
      showFilter,
      pagination,
      userType: USER_TYPE_CONSTANT,
    },
    handler: {
      setVisible,
      handleSubmit,
      handleEdit,
      handleDelete,
      handleUpdate,
      handleUpdateReRegistration,
      register,
      setOpenComboboxSchool,
      setOpenComboboxDivision,
      setSchool,
      resetState,
      getDivisions,
      setDivision,
      setShowFilter,
      setPagination,
    },
  };
}
