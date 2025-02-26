import {
  DivisionInterface,
  SCHOOL_TYPE,
} from "@/interfaces/division_interface";
import { alertSuccess } from "@/lib/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
  school_type: z.string().min(3).max(100),
  price: z.string().min(3).max(100),
  markings: z.array(z.string()),
});

export default function Hook() {
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
      name: "Hiking Penegak Putra",
      school_type: "SMK/SMA/MA",
      markings: [],
      price: "125.000",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "markings",
  });

  const divisions = [
    {
      name: "Hiking Penegak Putra",
      markings: "[]",
      school_type: { name: "SMK/SMA/MA" },
      price: "100.000",
    },
    {
      name: "Hiking Penegak Putri",
      markings: "[]",
      school_type: { name: "SMK/SMA/MA" },
      price: "100.000",
    },
    {
      name: "Hiking Penggalang Putra",
      markings: "[]",
      school_type: { name: "SMP/MTs" },
      price: "100.000",
    },
    {
      name: "Hiking Penggalang Putri",
      markings: "[]",
      school_type: { name: "SMP/MTs" },
      price: "100.000",
    },
    {
      name: "LKBBT Penegak",
      markings: "[]",
      school_type: { name: "SMK/SMA/MA" },
      price: "100.000",
    },
    {
      name: "LKBBT Penggalang",
      markings: "[]",
      school_type: { name: "SMP/MTs" },
      price: "100.000",
    },
  ] as DivisionInterface[];

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    console.log(data);
    setVisible({ show: false, title: "", type: 1 });
  };

  const handleEdit = (data: DivisionInterface) => {
    form.reset({
      name: data.name,
      school_type: data.school_type?.name,
      markings: JSON.parse(data.markings),
    });
    setVisible({ show: true, title: `Edit ${data.name}`, type: 1 });
  };

  const handleDelete = (data: DivisionInterface) => {
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
      divisions,
      visible,
      isLoadingForm,
      form,
      schoolTypes: SCHOOL_TYPE,
      formMarking: { fields, append, remove },
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
