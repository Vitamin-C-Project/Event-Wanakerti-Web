import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { AGENDA_NAME } from "@/constants/global_constant";
import { AgendaInterface } from "@/interfaces/cms_interface";
import { toastRender } from "@/lib/alert";
import { formatDateYMD, postData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schemaForm = z.object({
  activity_day: z.string(),
  technical_meeting_1: z.string(),
  technical_meeting_2: z.string(),
  start_registration: z.string(),
  end_registration: z.string(),
});

export default function Hook() {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      activity_day: formatDateYMD(new Date()),
      technical_meeting_1: formatDateYMD(new Date()),
      technical_meeting_2: formatDateYMD(new Date()),
      start_registration: formatDateYMD(new Date()),
      end_registration: formatDateYMD(new Date()),
    },
  });

  const getAgenda = async () => {
    setIsLoadingData(true);

    try {
      const response = await postData(API_PATH_CONSTANT.CMS.AGENDA.SHOW, {});

      form.setValue(
        "activity_day",
        response.data.data.filter(
          (item: AgendaInterface) => item.name == AGENDA_NAME.ACTIVITY
        )[0].date
      );

      form.setValue(
        "technical_meeting_1",
        response.data.data.filter(
          (item: AgendaInterface) =>
            item.name == AGENDA_NAME.TECHNICAL_MEETING_1
        )[0].date
      );

      form.setValue(
        "technical_meeting_2",
        response.data.data.filter(
          (item: AgendaInterface) =>
            item.name == AGENDA_NAME.TECHNICAL_MEETING_2
        )[0].date
      );

      form.setValue(
        "start_registration",
        response.data.data.filter(
          (item: AgendaInterface) => item.name == AGENDA_NAME.START_REGISTRATION
        )[0].date
      );

      form.setValue(
        "end_registration",
        response.data.data.filter(
          (item: AgendaInterface) => item.name == AGENDA_NAME.END_REGISTRATION
        )[0].date
      );
    } catch (error) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    setIsLoadingForm(true);
    try {
      const response = await postData(
        API_PATH_CONSTANT.CMS.AGENDA.UPDATE,
        data
      );

      toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);
      getAgenda();
    } catch (error: any) {
      toastRender(error.status, error.response.data.messages);
    } finally {
      setIsLoadingForm(false);
    }
  };

  useEffect(() => {
    getAgenda();
  }, []);

  return {
    state: { isLoadingData, isLoadingForm, form },
    handler: { handleSubmit },
  };
}
