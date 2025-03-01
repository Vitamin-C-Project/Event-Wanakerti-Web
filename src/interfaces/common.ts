import { ComponentPropsWithoutRef } from "react";

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  to: number;
  total: number;
}

export interface ILinkMeta {
  url: string;
  label: string;
  active: boolean;
}

export type CommonColumn = {
  id?: number;
  created_at?: string;
  updated_at?: string;
};

export interface BreadcrumbInterface {
  title: string;
  href: string;
}

export interface ResponseApiInterface {
  code: number;
  messages: string;
  data?: Object | Array<Object> | null;
  pagination?: Object;
}

export interface FormInterface extends ComponentPropsWithoutRef<"form"> {
  form: any;
  state: any;
  handler: any;
}
