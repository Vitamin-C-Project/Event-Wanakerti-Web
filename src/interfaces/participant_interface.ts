import { CommonColumn } from "./common";
import {
  DivisionInterface,
  MarkingChildrenInterface,
  SchoolTypeInterface,
} from "./division_interface";
import { UserInterface } from "./user_interface";

export interface ParticipantSchoolInterface extends CommonColumn {
  user: UserInterface;
  school_type: SchoolTypeInterface;
  name: string;
  address: string;
  person_responsible: string;
  phone_number: string;
  email: string;
  lkbbt_count: number;
  hiking_count: number;
  school_type_id: number;
}

export interface ParticipantTeamInterface extends CommonColumn {
  school: ParticipantSchoolInterface;
  division: DivisionInterface;
  name: string;
  code: string;
  status: number;
  payment_status: number;
  re_registration_status: number;
  members?: ParticipantTeamMemberInterface[];
}
export interface ParticipantTeamMarkingInterface extends CommonColumn {
  name: string;
  code: string;
  marking?: MarkingChildrenInterface[];
}

export interface ParticipantTeamMemberInterface extends CommonColumn {
  name?: string;
  code?: string;
  school_name?: string;
  team?: ParticipantTeamInterface;
  class?: string;
  gender?: number;
  badge?: string;
  proof_health?: string;
  type?: string;
}

export interface ParticipantMemberInterface extends CommonColumn {
  team: ParticipantTeamInterface;
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
