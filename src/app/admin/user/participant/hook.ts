import { UserInterface } from "@/interfaces/user_interface";
import { alertSuccess } from "@/lib/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const schemaForm = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().min(3).max(150),
  username: z.string().min(3).max(100),
});

export default function Hook() {
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "Hakim Asrori",
      email: "hakim.asrori@mailinator.com",
      username: "LJJKPW61234",
    },
  });

  const users = [
    {
      name: "Hakim Asrori",
      username: "hakim24",
      email: "hakim@mailinator.com",
    },
    {
      name: "Hakim Asrori",
      username: "hakim24",
      email: "hakim@mailinator.com",
    },
    {
      name: "Hakim Asrori",
      username: "hakim24",
      email: "hakim@mailinator.com",
    },
    {
      name: "Hakim Asrori",
      username: "hakim24",
      email: "hakim@mailinator.com",
    },
  ] as UserInterface[];

  const handleSubmit = async (data: z.infer<typeof schemaForm>) => {
    console.log(data);
    setVisible({ show: false, title: "", type: 1 });
  };

  const handleEdit = (data: UserInterface) => {
    form.reset(data);
    setVisible({ show: true, title: `Edit Akun ${data.name}`, type: 1 });
  };

  const handleDelete = (data: UserInterface) => {
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
    state: { visible, users, form, isLoadingForm },
    handler: { setVisible, handleSubmit, handleEdit, handleDelete },
  };
}
