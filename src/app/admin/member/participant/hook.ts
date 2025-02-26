import { ParticipantMemberInterface } from "@/interfaces/participant_interface";
import { alertSuccess } from "@/lib/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  participant_team: z.string().min(3).max(100),
  name: z.string().min(3).max(100),
  class: z.string().min(3).max(100),
  gender: z.string().min(3).max(100),
  badge: z.string().min(3).max(100),
  proof_health: z.string().min(3).max(100),
});

export default function Hook() {
  const members = [
    {
      name: "Hakim Asrori",
      class: "10 TKJ 1",
      gender: "Laki-laki",
      participant_team: {
        name: "Insyaallah Menang",
      },
    },
  ] as ParticipantMemberInterface[];

  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      participant_team: "Insyaallah Menang",
      name: "Hakim Asrori",
      class: "10 TKJ 1",
      gender: "Laki-laki",
      badge: "blob:https://via.placeholder.com/150",
      proof_health: "blob:https://via.placeholder.com/150",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    console.log(data);
    setVisible({ show: false, title: "", type: 1 });
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
    }).then((result) => {
      if (result.isConfirmed) {
        alertSuccess("Hapus data berhasil!");
      }
    });
  };

  return {
    state: { members, visible, form, openCombobox, isLoadingForm },
    handler: {
      setVisible,
      handleDelete,
      handleSubmit,
      setOpenCombobox,
      setIsLoadingForm,
    },
  };
}
