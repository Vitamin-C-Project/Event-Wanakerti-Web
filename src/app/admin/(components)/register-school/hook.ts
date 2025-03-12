import { SCHOOL_TYPE } from "@/interfaces/division_interface";
import { ParticipantSchoolInterface } from "@/interfaces/participant_interface";
import { alertSuccess, toastRender } from "@/lib/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import store from "store";
import { z } from "zod";
import { postData } from "@/lib/utils";
import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { useAppSelector } from "@/lib/hooks";
import { useNavigate } from "react-router-dom";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  address: z.string().min(3).max(200),
  phone_number: z.string().min(8).max(15),
  person_responsible: z.string().min(3).max(100),
  participant_school_type: z.string(),
});

export default function Hook() {
  const navigate = useNavigate();
  const [openCombobox, setOpenCombobox] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const user = useAppSelector((state) => state.user.userAuthenticated);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone_number: "",
      person_responsible: "",
      participant_school_type: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.PARTICIPANT.SCHOOL.CREATE,
        {
          user_id: user.id,
          name: data.name,
          email: data.email,
          person_responsible: data.person_responsible,
          address: data.address,
          phone_number: data.phone_number,
          school_type_id: data.participant_school_type,
        }
      );
      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      form.reset();
      navigate("/dashboard/member/edit-school");
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  return {
    state: {
      form,
      isLoadingForm,
      schoolTypes: SCHOOL_TYPE,
      openCombobox,
    },
    handler: {
      handleSubmit,
      setOpenCombobox,
    },
  };
}
