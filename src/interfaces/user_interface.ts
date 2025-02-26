import { CommonColumn } from "./common";

export interface UserInterface extends CommonColumn {
  name: string;
  email: string;
  username: string;
}
