import { CommonColumn } from "./common";
import { ParticipantSchoolInterface } from "./participant_interface";

export interface UserInterface extends CommonColumn {
  name: string;
  email: string;
  username: string;
  role?: RoleInterface;
  school?: ParticipantSchoolInterface;
}

export interface RoleInterface extends CommonColumn {
  name: string;
}
