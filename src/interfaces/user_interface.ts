import { CommonColumn } from "./common";
import { MarkingInterface } from "./division_interface";
import { ParticipantSchoolInterface } from "./participant_interface";

export interface UserInterface extends CommonColumn {
  name: string;
  email: string;
  username: string;
  role?: RoleInterface;
  school?: ParticipantSchoolInterface;
  user_type?: string;
  role_id?: number;
  criteria_id?: number;
  marking?: MarkingInterface;
}

export interface RoleInterface extends CommonColumn {
  name: string;
}
