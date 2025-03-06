import { CommonColumn } from "./common";
import { SchoolTypeInterface } from "./division_interface";

export interface CategoryInterface extends CommonColumn {
  school_type: SchoolTypeInterface;
  description: string;
  image: string;
  price: number;
}

export interface BrandInterface extends CommonColumn {
  image: string;
  name: string;
}

export interface ContactInterface extends CommonColumn {
  full_name: string;
  email: string;
  message: string;
}

export interface VideoInterface extends CommonColumn {
  url: string;
}

export interface AgendaInterface extends CommonColumn {
  name: string;
  date: string;
}
