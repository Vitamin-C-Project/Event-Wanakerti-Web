import { CommonColumn } from "./common";

export interface DivisionInterface extends CommonColumn {
  name: string;
  price: number;
  criteria_markings: MarkingInterface[];
}

export interface SchoolTypeInterface extends CommonColumn {
  name: string;
  alias: string;
}

export interface MarkingInterface extends CommonColumn {
  division_id: number;
  name: string;
  division?: DivisionInterface;
  children?: MarkingChildrenInterface[];
}

export interface MarkingChildrenInterface extends CommonColumn {
  name: string;
  mark?: string;
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
