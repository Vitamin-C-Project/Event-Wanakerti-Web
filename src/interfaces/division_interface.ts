import { CommonColumn } from "./common";

export interface DivisionInterface extends CommonColumn {
  school_type?: SchoolTypeInterface;
  name: string;
  markings: Array<string>;
  price: number;
}

export interface SchoolTypeInterface extends CommonColumn {
  name: string;
  alias: string;
}

export const SCHOOL_TYPE = [
  {
    KEY: 1,
    VALUE: "SMK/SMA/MA",
  },
  {
    KEY: 2,
    VALUE: "SMP/MTs",
  },
  {
    KEY: 3,
    VALUE: "SD/MI",
  },
];
