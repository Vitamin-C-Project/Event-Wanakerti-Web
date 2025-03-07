import { API_PATH_CONSTANT } from "@/constants/api_constant";
import { postData } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Hook() {
  const [contents, setContents] = useState({});

  const getContents = async () => {
    try {
      const response = await postData(API_PATH_CONSTANT.CMS.ALL_CONTENT, {});

      setContents(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  return { state: { contents }, handler: {} };
}
