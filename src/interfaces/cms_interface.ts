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
  name: string;
  email: string;
  message: string;
}
