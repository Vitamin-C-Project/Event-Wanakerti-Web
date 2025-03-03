import { CommonColumn } from "./common";
import { DivisionInterface } from "./division_interface";

export interface CategoryInterface extends CommonColumn {
  division: DivisionInterface;
  description: string;
  image: string;
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
