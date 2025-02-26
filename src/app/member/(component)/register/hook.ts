import { SCHOOL_TYPE } from "@/interfaces/division_interface";
import { ParticipantSchoolInterface } from "@/interfaces/participant_interface";
import { alertSuccess } from "@/lib/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import store from "store";
import { z } from "zod";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  address: z.string().min(3).max(200),
  phone_number: z.string().min(8).max(15),
  person_responsible: z.string().min(3).max(100),
  participant_school_type: z.string().min(3).max(100),
});

export default function Hook() {
  const [openCombobox, setOpenCombobox] = useState(false);
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "SMKN 1 Losarang",
      email: "smkn1losarang@gmail.com",
      address:
        "Jl. Raya Pantura, Santing, Kec. Losarang, Kabupaten Indramayu, Jawa Barat 45253",
      phone_number: "089123455",
      person_responsible: "Kang Carnadi",
      participant_school_type: "SMK/SMA/MA",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    console.log(data);
    store.set("participantSchool", data);
    setVisible({ show: false, title: "", type: 1 });
    window.location.reload();
  };

  const handleEdit = (data: ParticipantSchoolInterface) => {
    form.reset({
      name: data.name,
      email: data.email,
      address: data.address,
      phone_number: data.phone_number,
      person_responsible: data.person_responsible,
      participant_school_type: data.participant_school_type.name,
    });
    setVisible({ show: true, title: `Edit Akun ${data.name}`, type: 1 });
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
    }).then((result) => {
      if (result.isConfirmed) {
        alertSuccess("Hapus data berhasil!");
      }
    });
  };

  return {
    state: {
      form,
      isLoadingForm,
      visible,
      schoolTypes: SCHOOL_TYPE,
      openCombobox,
    },
    handler: {
      setVisible,
      handleSubmit,
      handleEdit,
      handleDelete,
      setOpenCombobox,
    },
  };
}
