import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import axios from "axios";
import hmacSHA256 from "crypto-js/hmac-sha256";
import jsCookie from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSignature = async ({ _uri }: { _uri: string }) => {
  const httpMethod = "POST";
  const _time = moment().unix();
  let pattern = (httpMethod + ":" + _uri + ":" + _time).toUpperCase();
  pattern = btoa(pattern);
  const secretKey = import.meta.env.VITE_SECRET_KEY;

  const hmacDigest = hmacSHA256(pattern, secretKey).toString();

  return {
    signature: hmacDigest,
    timestamp: _time,
  };
};

export const decryptApiResponse = async (data: any) => {
  const decoded = atob(data);
  const iv = new Uint8Array(
    [...decoded].slice(0, 16).map((x) => x.charCodeAt(0))
  );
  const encryptedData = new Uint8Array(
    [...decoded].slice(16).map((c) => c.charCodeAt(0))
  );

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(import.meta.env.VITE_SECRET_KEY),
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: iv },
    cryptoKey,
    encryptedData
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
};

export async function postData(
  path: string,
  body_request: any,
  header_request?: any
) {
  const signature = await generateSignature({ _uri: path });

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    headers: {
      Authorization: "Bearer " + jsCookie.get("LJJKPW"),
      "x-signature": signature.signature,
      "x-timestamp": signature.timestamp,
      ...header_request,
    },
  });

  const response = await axiosInstance.post(path, body_request);

  if (response.data.data) {
    response.data.data = await decryptApiResponse(response.data.data);
  }
  console.log(response);

  return response;
}

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
};

export const formatDateYMD = (date: Date) => {
  return date.toISOString().split("T")[0];
};
