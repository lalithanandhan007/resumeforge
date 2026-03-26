/* eslint-disable */
// @ts-nocheck
import { IDL } from '@icp-sdk/core/candid';

const User = IDL.Record({
  id: IDL.Principal,
  name: IDL.Text,
  email: IDL.Text,
  createdAt: IDL.Int,
});

const Resume = IDL.Record({
  id: IDL.Text,
  userId: IDL.Principal,
  personalName: IDL.Text,
  personalTitle: IDL.Text,
  personalEmail: IDL.Text,
  personalPhone: IDL.Text,
  personalLocation: IDL.Text,
  personalLinkedin: IDL.Text,
  summary: IDL.Text,
  experienceJson: IDL.Text,
  educationJson: IDL.Text,
  skillsJson: IDL.Text,
  template: IDL.Text,
  createdAt: IDL.Int,
  updatedAt: IDL.Int,
});

const Result_User = IDL.Variant({ ok: User, err: IDL.Text });
const Result_Text = IDL.Variant({ ok: IDL.Text, err: IDL.Text });
const Result_Void = IDL.Variant({ ok: IDL.Null, err: IDL.Text });

export const idlService = IDL.Service({
  createUser: IDL.Func([IDL.Text, IDL.Text], [Result_User], []),
  getMe: IDL.Func([], [Result_User], ['query']),
  createResume: IDL.Func(
    [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
    [Result_Text], []
  ),
  getMyResumes: IDL.Func([], [IDL.Vec(Resume)], ['query']),
  updateResume: IDL.Func(
    [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
    [Result_Void], []
  ),
  deleteResume: IDL.Func([IDL.Text], [Result_Void], []),
});

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({
    id: IDL.Principal,
    name: IDL.Text,
    email: IDL.Text,
    createdAt: IDL.Int,
  });
  const Resume = IDL.Record({
    id: IDL.Text,
    userId: IDL.Principal,
    personalName: IDL.Text,
    personalTitle: IDL.Text,
    personalEmail: IDL.Text,
    personalPhone: IDL.Text,
    personalLocation: IDL.Text,
    personalLinkedin: IDL.Text,
    summary: IDL.Text,
    experienceJson: IDL.Text,
    educationJson: IDL.Text,
    skillsJson: IDL.Text,
    template: IDL.Text,
    createdAt: IDL.Int,
    updatedAt: IDL.Int,
  });
  const Result_User = IDL.Variant({ ok: User, err: IDL.Text });
  const Result_Text = IDL.Variant({ ok: IDL.Text, err: IDL.Text });
  const Result_Void = IDL.Variant({ ok: IDL.Null, err: IDL.Text });
  return IDL.Service({
    createUser: IDL.Func([IDL.Text, IDL.Text], [Result_User], []),
    getMe: IDL.Func([], [Result_User], ['query']),
    createResume: IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
      [Result_Text], []
    ),
    getMyResumes: IDL.Func([], [IDL.Vec(Resume)], ['query']),
    updateResume: IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
      [Result_Void], []
    ),
    deleteResume: IDL.Func([IDL.Text], [Result_Void], []),
  });
};

export const init = ({ IDL }) => { return []; };
