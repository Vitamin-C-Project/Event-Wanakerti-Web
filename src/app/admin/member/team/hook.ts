import { ParticipantTeamInterface } from "@/interfaces/participant_interface";
import { alertSuccess } from "@/lib/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  school: z.string().min(3).max(100),
  division: z.string().min(3).max(100),
  name: z.string().min(3).max(100),
  status: z.boolean(),
  payment_status: z.boolean(),
});

export default function Hook() {
  const location = useLocation();

  const teams = [
    {
      code: "P-111",
      division: {
        name: "Hiking Penegak Putra",
      },
      name: "Insyaallah Menang",
      payment_status: 1,
      status: 1,
      school: { name: "SMKN 1 Losarang" },
    },
    {
      code: "P-112",
      division: {
        name: "Hiking Penegak Putra",
      },
      name: "Insyaallah Menang 2",
      payment_status: 1,
      status: 0,
      school: { name: "SMKN 1 Losarang" },
    },
  ] as ParticipantTeamInterface[];

  const [openCombobox, setOpenCombobox] = useState(false);
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const { register } = useForm();
  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      school: "SMKN 1 Losarang",
      division: "Hiking Penegak Putra",
      name: "Insyaallah Menang",
      payment_status: false,
      status: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    console.log(data);
    setVisible({ show: false, title: "", type: 1 });
  };

  const handleEdit = (data: ParticipantTeamInterface) => {
    form.reset({});
    setVisible({ show: true, title: `Edit Akun ${data.name}`, type: 1 });
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
    }).then((result) => {
      if (result.isConfirmed) {
        alertSuccess("Hapus data berhasil!");
      }
    });
  };

  return {
    state: { teams, form, isLoadingForm, visible, openCombobox, location },
    handler: {
      setVisible,
      handleSubmit,
      handleEdit,
      handleDelete,
      setOpenCombobox,
      register,
    },
  };
}
