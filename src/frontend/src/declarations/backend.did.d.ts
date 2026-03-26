/* eslint-disable */
// @ts-nocheck
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export interface User {
  id: Principal;
  name: string;
  email: string;
  createdAt: bigint;
}

export interface Resume {
  id: string;
  userId: Principal;
  personalName: string;
  personalTitle: string;
  personalEmail: string;
  personalPhone: string;
  personalLocation: string;
  personalLinkedin: string;
  summary: string;
  experienceJson: string;
  educationJson: string;
  skillsJson: string;
  template: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export type Result_User = { ok: User } | { err: string };
export type Result_Text = { ok: string } | { err: string };
export type Result_Void = { ok: null } | { err: string };

export interface _SERVICE {
  createUser: ActorMethod<[string, string], Result_User>;
  getMe: ActorMethod<[], Result_User>;
  createResume: ActorMethod<[string, string, string, string, string, string, string, string, string, string, string], Result_Text>;
  getMyResumes: ActorMethod<[], Resume[]>;
  updateResume: ActorMethod<[string, string, string, string, string, string, string, string, string, string, string, string], Result_Void>;
  deleteResume: ActorMethod<[string], Result_Void>;
}

export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
