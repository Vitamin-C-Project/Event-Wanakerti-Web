import { AGENDA_NAME } from "@/constants/global_constant";
import { Calendar } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

type Event = {
  name: string;
  date: string;
};

export default function TimeLine({ contents }: { contents: any }) {
  const [startRegistrationEvent, setStartRegistrationEvent] = useState<Event>({
    name: "",
    date: "",
  });
  const [endRegistrationEvent, setEndRegistrationEvent] = useState<Event>({
    name: "",
    date: "",
  });
  const [
    technicalMeeting1RegistrationEvent,
    setTechnicalMeeting1RegistrationEvent,
  ] = useState<Event>({
    name: "",
    date: "",
  });
  const [
    technicalMeeting2RegistrationEvent,
    setTechnicalMeeting2RegistrationEvent,
  ] = useState<Event>({
    name: "",
    date: "",
  });
  const [activityRegistrationEvent, setActivityRegistrationEvent] =
    useState<Event>({
      name: "",
      date: "",
    });

  useEffect(() => {
    if (!contents.activities) return;

    setStartRegistrationEvent(
      contents.activities.find(
        (item: any) => item.name == AGENDA_NAME.START_REGISTRATION
      )
    );

    setEndRegistrationEvent(
      contents.activities.find(
        (item: any) => item.name == AGENDA_NAME.END_REGISTRATION
      )
    );

    setTechnicalMeeting1RegistrationEvent(
      contents.activities.find(
        (item: any) => item.name == AGENDA_NAME.TECHNICAL_MEETING_1
      )
    );

    setTechnicalMeeting2RegistrationEvent(
      contents.activities.find(
        (item: any) => item.name == AGENDA_NAME.TECHNICAL_MEETING_2
      )
    );

    setActivityRegistrationEvent(
      contents.activities.find((item: any) => item.name == AGENDA_NAME.ACTIVITY)
    );
  }, [contents]);

  const formatDateYMD = (date: string) => {
    return moment(date).format("DD MMMM YYYY");
  };

  return (
    <div className="py-16 bg-white relative overflow-hidden">
      <div className="absolute left-0 top-0 text-yellow-300 text-8xl opacity-50">
        ★
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-comic-sans-ms font-bold mb-12 z-30 relative">
          GARIS WAKTU ACARA
        </h2>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-400"></div>

          <div className="space-y-12">
            <div className="flex items-center flex-row">
              <div className="w-5/12 text-center bg-yellow-100 p-3 rounded-2xl shadow">
                <h3 className="text-xl font-bold mb-2">Registrasi Mulai</h3>
                <p className="text-gray-600">
                  <Calendar size={16} className="inline" />{" "}
                  {formatDateYMD(startRegistrationEvent?.date)}
                </p>
              </div>

              <div className="w-2/12 flex justify-center relative">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>

              <div className="w-5/12"></div>
            </div>

            <div className="flex items-center flex-row-reverse">
              <div className="w-5/12 text-center  bg-yellow-100 p-3 rounded-2xl shadow">
                <h3 className="text-xl font-bold mb-2">Registrasi Tutup</h3>
                <p className="text-gray-600">
                  <Calendar size={16} className="inline" />{" "}
                  {formatDateYMD(endRegistrationEvent?.date)}
                </p>
              </div>

              <div className="w-2/12 flex justify-center relative">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>

              <div className="w-5/12"></div>
            </div>

            <div className="flex items-center flex-row">
              <div className="w-5/12 text-center bg-yellow-100 p-3 rounded-2xl shadow">
                <h3 className="text-xl font-bold mb-2">Technical Meeting 1</h3>
                <p className="text-gray-600">
                  <Calendar size={16} className="inline" />{" "}
                  {formatDateYMD(technicalMeeting1RegistrationEvent?.date)}
                </p>
              </div>

              <div className="w-2/12 flex justify-center relative">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>

              <div className="w-5/12"></div>
            </div>

            <div className="flex items-center flex-row-reverse">
              <div className="w-5/12 text-center bg-yellow-100 p-3 rounded-2xl shadow">
                <h3 className="text-xl font-bold mb-2">Technical Meeting 2</h3>
                <p className="text-gray-600">
                  <Calendar size={16} className="inline" />{" "}
                  {formatDateYMD(technicalMeeting2RegistrationEvent?.date)}
                </p>
              </div>

              <div className="w-2/12 flex justify-center relative">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>

              <div className="w-5/12"></div>
            </div>

            <div className="flex justify-center items-center pt-8">
              <div className="bg-yellow-400 rounded-lg py-4 px-10 text-center shadow-lg transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold mb-2">Acara Inti</h3>
                <p className="text-gray-800 flex items-center justify-center gap-2">
                  <Calendar size={16} className="inline" />
                  {formatDateYMD(activityRegistrationEvent?.date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
