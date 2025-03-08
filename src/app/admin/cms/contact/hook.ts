import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { ContactInterface } from "@/interfaces/cms_interface";
import { toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Hook() {
  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const getContacts = async () => {
    setIsLoadingData(true);
    try {
      let response = await postData(API_PATH_CONSTANT.CMS.CONTACT_US.LIST, {});

      setContacts(response.data.data);
    } catch (error) {
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleDelete = async (data: ContactInterface) => {
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
        setIsLoadingData(true);
        const response = await postData(
          API_PATH_CONSTANT.CMS.CONTACT_US.DELETE,
          {
            uid: data?.id,
          }
        );

        toastRender(API_CODE_CONSTANT.HTTP_OK, response.data.messages);

        getContacts();
      }
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return {
    state: { contacts, isLoadingData },
    handler: { handleDelete },
  };
}
