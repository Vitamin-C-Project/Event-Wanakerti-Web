import { CommonColumn } from "./common";
import { DivisionInterface, SchoolTypeInterface } from "./division_interface";
import { UserInterface } from "./user_interface";

export interface ParticipantSchoolInterface extends CommonColumn {
  user: UserInterface;
  participant_school_type: SchoolTypeInterface;
  name: string;
  address: string;
  person_responsible: string;
  phone_number: string;
  email: string;
}

export interface ParticipantTeamInterface extends CommonColumn {
  school: ParticipantSchoolInterface;
  division: DivisionInterface;
  name: string;
  code: string;
  status: number;
  payment_status: number;
}

export interface ParticipantMemberInterface extends CommonColumn {
  participant_team: ParticipantTeamInterface;
  name: string;
  class: string;
  gender: string;
  badge: string;
  proof_health: string;
  status: number;
}

export interface ParticipantMarkingInterface extends CommonColumn {
  participant_team: ParticipantTeamInterface;
  division: DivisionInterface;
  markings: string;
}
