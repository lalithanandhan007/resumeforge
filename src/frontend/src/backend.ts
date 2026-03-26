/* eslint-disable */
// @ts-nocheck

import { Actor, HttpAgent, type HttpAgentOptions, type ActorConfig, type ActorSubclass, type Agent } from "@icp-sdk/core/agent";
import type { Principal } from "@icp-sdk/core/principal";
import { idlFactory, type _SERVICE } from "./declarations/backend.did";

export interface Some<T> { __kind__: "Some"; value: T; }
export interface None { __kind__: "None"; }
export type Option<T> = Some<T> | None;

export class ExternalBlob {
  _blob?: Uint8Array<ArrayBuffer> | null;
  directURL: string;
  onProgress?: (percentage: number) => void = undefined;
  private constructor(directURL: string, blob: Uint8Array<ArrayBuffer> | null) {
    if (blob) { this._blob = blob; }
    this.directURL = directURL;
  }
  static fromURL(url: string): ExternalBlob { return new ExternalBlob(url, null); }
  static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob {
    const url = URL.createObjectURL(new Blob([new Uint8Array(blob)], { type: 'application/octet-stream' }));
    return new ExternalBlob(url, blob);
  }
  public async getBytes(): Promise<Uint8Array<ArrayBuffer>> {
    if (this._blob) return this._blob;
    const response = await fetch(this.directURL);
    const blob = await response.blob();
    this._blob = new Uint8Array(await blob.arrayBuffer());
    return this._blob;
  }
  public getDirectURL(): string { return this.directURL; }
  public withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob {
    this.onProgress = onProgress;
    return this;
  }
}

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

export interface backendInterface {
  _initializeAccessControlWithSecret(secret: string): Promise<void>;
  createUser(name: string, email: string): Promise<{ ok: User } | { err: string }>;
  getMe(): Promise<{ ok: User } | { err: string }>;
  createResume(
    personalName: string, personalTitle: string, personalEmail: string,
    personalPhone: string, personalLocation: string, personalLinkedin: string,
    summary: string, experienceJson: string, educationJson: string,
    skillsJson: string, template: string,
  ): Promise<{ ok: string } | { err: string }>;
  getMyResumes(): Promise<Resume[]>;
  updateResume(
    id: string, personalName: string, personalTitle: string, personalEmail: string,
    personalPhone: string, personalLocation: string, personalLinkedin: string,
    summary: string, experienceJson: string, educationJson: string,
    skillsJson: string, template: string,
  ): Promise<{ ok: null } | { err: string }>;
  deleteResume(id: string): Promise<{ ok: null } | { err: string }>;
}

export class Backend implements backendInterface {
  constructor(
    private actor: ActorSubclass<_SERVICE>,
    private _uploadFile?: (file: ExternalBlob) => Promise<Uint8Array>,
    private _downloadFile?: (file: Uint8Array) => Promise<ExternalBlob>,
    private processError?: (error: unknown) => never,
  ) {}

  async _initializeAccessControlWithSecret(_secret: string): Promise<void> {
    // No-op: authorization component not used in this project
  }

  async createUser(name: string, email: string): Promise<{ ok: User } | { err: string }> {
    return this.actor.createUser(name, email) as any;
  }

  async getMe(): Promise<{ ok: User } | { err: string }> {
    return this.actor.getMe() as any;
  }

  async createResume(
    personalName: string, personalTitle: string, personalEmail: string,
    personalPhone: string, personalLocation: string, personalLinkedin: string,
    summary: string, experienceJson: string, educationJson: string,
    skillsJson: string, template: string,
  ): Promise<{ ok: string } | { err: string }> {
    return this.actor.createResume(
      personalName, personalTitle, personalEmail, personalPhone,
      personalLocation, personalLinkedin, summary, experienceJson,
      educationJson, skillsJson, template,
    ) as any;
  }

  async getMyResumes(): Promise<Resume[]> {
    return this.actor.getMyResumes() as any;
  }

  async updateResume(
    id: string, personalName: string, personalTitle: string, personalEmail: string,
    personalPhone: string, personalLocation: string, personalLinkedin: string,
    summary: string, experienceJson: string, educationJson: string,
    skillsJson: string, template: string,
  ): Promise<{ ok: null } | { err: string }> {
    return this.actor.updateResume(
      id, personalName, personalTitle, personalEmail, personalPhone,
      personalLocation, personalLinkedin, summary, experienceJson,
      educationJson, skillsJson, template,
    ) as any;
  }

  async deleteResume(id: string): Promise<{ ok: null } | { err: string }> {
    return this.actor.deleteResume(id) as any;
  }
}

export interface CreateActorOptions {
  agent?: Agent;
  agentOptions?: HttpAgentOptions;
  actorOptions?: ActorConfig;
  processError?: (error: unknown) => never;
}

export function createActor(
  canisterId: string,
  uploadFile?: (file: ExternalBlob) => Promise<Uint8Array>,
  downloadFile?: (file: Uint8Array) => Promise<ExternalBlob>,
  options: CreateActorOptions = {},
): Backend {
  const agent = options.agent || HttpAgent.createSync({ ...options.agentOptions });
  const actor = Actor.createActor<_SERVICE>(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
  return new Backend(actor, uploadFile, downloadFile, options.processError);
}
