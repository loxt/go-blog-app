import * as grpcWeb from 'grpc-web';

import {
  AuthResponse,
  AuthUserRequest,
  AuthUserResponse,
  EmailUsedRequest,
  LoginRequest,
  SignupRequest,
  UsedResponse,
  UsernameUsedRequest} from './services_pb';

export class AuthServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  login(
    request: LoginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: AuthResponse) => void
  ): grpcWeb.ClientReadableStream<AuthResponse>;

  signup(
    request: SignupRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: AuthResponse) => void
  ): grpcWeb.ClientReadableStream<AuthResponse>;

  usernameUsed(
    request: UsernameUsedRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UsedResponse) => void
  ): grpcWeb.ClientReadableStream<UsedResponse>;

  emailUsed(
    request: EmailUsedRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UsedResponse) => void
  ): grpcWeb.ClientReadableStream<UsedResponse>;

  authUser(
    request: AuthUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: AuthUserResponse) => void
  ): grpcWeb.ClientReadableStream<AuthUserResponse>;

}

export class AuthServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  login(
    request: LoginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<AuthResponse>;

  signup(
    request: SignupRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<AuthResponse>;

  usernameUsed(
    request: UsernameUsedRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<UsedResponse>;

  emailUsed(
    request: EmailUsedRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<UsedResponse>;

  authUser(
    request: AuthUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<AuthUserResponse>;

}

