import { API_CODE_CONSTANT, API_PATH_CONSTANT } from "@/constants/api_constant";
import { ContactInterface } from "@/interfaces/cms_interface";
import { IMeta } from "@/interfaces/common";
import { toastRender } from "@/lib/alert";
import { postData } from "@/lib/utils";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Hook() {
  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [filters, setFilters] = useState({
    search: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
  });
  const [metadata, setMetadata] = useState<IMeta>();
  const [isLoadingData, setIsLoadingData] = useState(false);

  const getContacts = async () => {
    setIsLoadingData(true);
    try {
      let response = await postData(API_PATH_CONSTANT.CMS.CONTACT_US.LIST, {
        ...filters,
        ...pagination,
      });

      setContacts(response.data.data);
      setMetadata(response.data.pagination);
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
      confirmButtonColor: "#603F26",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
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
  }, [pagination, filters]);

  return {
    state: { contacts, isLoadingData, filters, pagination, metadata },
    handler: { handleDelete, setFilters, setPagination },
  };
}
