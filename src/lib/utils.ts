import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import axios from "axios";
import hmacSHA256 from "crypto-js/hmac-sha256";
import jsCookie from "js-cookie";
import CryptoJS from "crypto-js";

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

export const decryptApiResponse = async (data: string) => {
  const result = data.split(".");

  const iv = CryptoJS.enc.Hex.parse(result[0]);
  const salt = CryptoJS.enc.Hex.parse(result[1]);
  const ciphertext = CryptoJS.enc.Base64.parse(result[2]);

  const key = CryptoJS.PBKDF2(import.meta.env.VITE_SECRET_KEY, salt, {
    keySize: 64 / 8, // 64 byte (512 bit) → 32 byte (256 bit) untuk AES-256
    iterations: 999,
    hasher: CryptoJS.algo.SHA512,
  });

  const decrypted = CryptoJS.AES.decrypt({ ciphertext }, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  return JSON.parse(decryptedText);
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

  // const baseURL = new URL(axiosInstance.defaults.baseURL as string).hostname;

  // if (response.data.data && !["localhost", "127.0.0.1"].includes(baseURL)) {
  //   response.data.data = await decryptApiResponse(response.data.data);
  // }

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
