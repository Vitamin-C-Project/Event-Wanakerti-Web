import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { MarkingChildrenInterface } from "@/interfaces/division_interface";
import {
  ParticipantTeamInterface,
  ParticipantTeamMarkingInterface,
} from "@/interfaces/participant_interface";
import { UserInterface } from "@/interfaces/user_interface";
import { toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Hook({ user }: { user: UserInterface }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [teams, setTeams] = useState<ParticipantTeamInterface[]>([]);
  const [teamMarkings, setTeamMarkings] = useState<
    ParticipantTeamMarkingInterface[]
  >([]);
  const [form, setForm] = useState<{
    participant_team_id: string;
    markings: MarkingChildrenInterface[];
  }>({
    participant_team_id: "",
    markings: [],
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const validateForm = () => {
    if (!form.participant_team_id) {
      alert("Pilih tim terlebih dahulu");
      return false;
    }

    for (let marking of form.markings) {
      if (Number(marking.mark) < 0 || Number(marking.mark) > 100) {
        alert("Nilai harus berada antara 0-100");
        return false;
      }

      if (isNaN(Number(marking.mark))) {
        alert("Nilai harus berupa angka");
        return false;
      }
    }

    return true;
  };

  const handleTeamChange = (e: any) => {
    setForm({
      ...form,
      participant_team_id: e,
    });
  };

  const handleMarkChange = (markingId: string, value: string) => {
    let numValue = parseInt(value);

    if (isNaN(numValue)) {
      numValue = 0;
    }

    numValue = Math.max(0, Math.min(100, numValue));

    const newMarkings = form.markings.map((marking) => {
      if (marking.id?.toString() == markingId) {
        return { ...marking, mark: numValue };
      }
      return marking;
    });

    setForm({
      ...form,
      markings: newMarkings,
    });
  };

  const getTeams = async () => {
    try {
      let response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.TEAM.LIST,
        {}
      );

      setTeams(response.data.data);

      setForm((prev) => ({
        ...prev,
        markings: user.marking?.children!,
      }));
    } catch (error) {}
  };

  const getTeamMarkings = async () => {
    setIsLoadingData(true);
    try {
      let response = await postData(API_PATH_CONSTANT.MARKING.LIST, {});

      setTeamMarkings(response.data.data);
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
        const response = await postData(API_PATH_CONSTANT.MARKING.SAVE, form);
        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);

        setValue("");
        setForm({
          participant_team_id: "",
          markings: user.marking?.children?.map((criteria) => ({
            id: criteria.id,
            mark: 0,
            name: criteria.name,
          })),
        });
        getTeamMarkings();
      } catch (error: any) {
        toastRender(error.status, error.response.data.messages);
      } finally {
        setIsLoadingForm(false);
      }
    }
  };

  useEffect(() => {
    getTeams();
    getTeamMarkings();
  }, []);

  return {
    state: {
      open,
      value,
      teams,
      teamMarkings,
      form,
      isLoadingForm,
      isLoadingData,
    },
    handler: {
      setOpen,
      setValue,
      handleTeamChange,
      handleMarkChange,
      handleSubmit,
    },
  };
}
