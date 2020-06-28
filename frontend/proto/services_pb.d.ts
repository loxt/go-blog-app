import * as jspb from "google-protobuf"

export class LoginRequest extends jspb.Message {
  getLogin(): string;
  setLogin(value: string): LoginRequest;

  getPassword(): string;
  setPassword(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    login: string,
    password: string,
  }
}

export class AuthResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): AuthResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AuthResponse): AuthResponse.AsObject;
  static serializeBinaryToWriter(message: AuthResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthResponse;
  static deserializeBinaryFromReader(message: AuthResponse, reader: jspb.BinaryReader): AuthResponse;
}

export namespace AuthResponse {
  export type AsObject = {
    token: string,
  }
}

export class SignupRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): SignupRequest;

  getEmail(): string;
  setEmail(value: string): SignupRequest;

  getPassword(): string;
  setPassword(value: string): SignupRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignupRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignupRequest): SignupRequest.AsObject;
  static serializeBinaryToWriter(message: SignupRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignupRequest;
  static deserializeBinaryFromReader(message: SignupRequest, reader: jspb.BinaryReader): SignupRequest;
}

export namespace SignupRequest {
  export type AsObject = {
    username: string,
    email: string,
    password: string,
  }
}

export class UsernameUsedRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): UsernameUsedRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsernameUsedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UsernameUsedRequest): UsernameUsedRequest.AsObject;
  static serializeBinaryToWriter(message: UsernameUsedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsernameUsedRequest;
  static deserializeBinaryFromReader(message: UsernameUsedRequest, reader: jspb.BinaryReader): UsernameUsedRequest;
}

export namespace UsernameUsedRequest {
  export type AsObject = {
    username: string,
  }
}

export class EmailUsedRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): EmailUsedRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailUsedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailUsedRequest): EmailUsedRequest.AsObject;
  static serializeBinaryToWriter(message: EmailUsedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailUsedRequest;
  static deserializeBinaryFromReader(message: EmailUsedRequest, reader: jspb.BinaryReader): EmailUsedRequest;
}

export namespace EmailUsedRequest {
  export type AsObject = {
    email: string,
  }
}

export class UsedResponse extends jspb.Message {
  getUsed(): boolean;
  setUsed(value: boolean): UsedResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UsedResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UsedResponse): UsedResponse.AsObject;
  static serializeBinaryToWriter(message: UsedResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UsedResponse;
  static deserializeBinaryFromReader(message: UsedResponse, reader: jspb.BinaryReader): UsedResponse;
}

export namespace UsedResponse {
  export type AsObject = {
    used: boolean,
  }
}

export class AuthUserRequest extends jspb.Message {
  getToken(): string;
  setToken(value: string): AuthUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AuthUserRequest): AuthUserRequest.AsObject;
  static serializeBinaryToWriter(message: AuthUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthUserRequest;
  static deserializeBinaryFromReader(message: AuthUserRequest, reader: jspb.BinaryReader): AuthUserRequest;
}

export namespace AuthUserRequest {
  export type AsObject = {
    token: string,
  }
}

export class AuthUserResponse extends jspb.Message {
  getId(): string;
  setId(value: string): AuthUserResponse;

  getUsername(): string;
  setUsername(value: string): AuthUserResponse;

  getEmail(): string;
  setEmail(value: string): AuthUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AuthUserResponse): AuthUserResponse.AsObject;
  static serializeBinaryToWriter(message: AuthUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthUserResponse;
  static deserializeBinaryFromReader(message: AuthUserResponse, reader: jspb.BinaryReader): AuthUserResponse;
}

export namespace AuthUserResponse {
  export type AsObject = {
    id: string,
    username: string,
    email: string,
  }
}

