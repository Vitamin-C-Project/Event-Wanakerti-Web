import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import {
  ParticipantMemberInterface,
  ParticipantTeamInterface,
} from "@/interfaces/participant_interface";
import { alertSuccess, toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  participant_team: z.string(),
  name: z.string().min(3).max(100),
  class: z.string().min(1).max(100),
  gender: z.string(),
  badge: z
    .instanceof(File, {
      message: "Badge is requires",
    })
    .refine(
      (file) =>
        ["image/jpg", "image/jpeg", "image/png", "application/pdf"].includes(
          file.type
        ),
      { message: "Badge type not allowed" }
    )
    .optional()
    .transform((file) => (file ? file : {})),
  proof_health: z
    .instanceof(File, {
      message: "Proof of health is requires",
    })
    .refine(
      (file) =>
        ["image/jpg", "image/jpeg", "image/png", "application/pdf"].includes(
          file.type
        ),
      { message: "Proof of health type not allowed" }
    )
    .optional()
    .transform((file) => (file ? file : {})),
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
  const [teams, setTeams] = useState<ParticipantTeamInterface[]>([]);
  const [members, setMembers] = useState<ParticipantMemberInterface[]>([]);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      participant_team: "",
      name: "",
      class: "",
      gender: "",
      badge: "",
      proof_health: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.MEMBER.CREATE,
        {
          ...data,
          team_id: data.participant_team,
        },
        {
          "Content-Type": "multipart/form-data",
        }
      );
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      getMembers();
      resetState();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleDelete = (data: ParticipantMemberInterface) => {
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
          API_PATH_CONSTANT.PARTICIPANT.MEMBER.DELETE,
          {
            uid: data?.id,
          }
        );

        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);

        getMembers();
      }
    });
  };

  const getTeams = async () => {
    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.TEAM.LIST,
        {}
      );

      setTeams(response.data.data);
    } catch (error) {}
  };

  const getMembers = async () => {
    setIsLoadingData(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.MEMBER.LIST,
        {}
      );
      setMembers(response.data.data);
    } catch (error) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const resetState = () => {
    setVisible({ show: false, title: "", type: 1 });
    form.reset();
  };

  useEffect(() => {
    getTeams();
    getMembers();
  }, []);

  return {
    state: {
      members,
      visible,
      form,
      openCombobox,
      isLoadingForm,
      teams,
      isLoadingData,
    },
    handler: {
      setVisible,
      handleDelete,
      handleSubmit,
      setOpenCombobox,
      setIsLoadingForm,
      resetState,
    },
  };
}
