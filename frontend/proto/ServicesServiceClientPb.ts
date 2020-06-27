/**
 * @fileoverview gRPC-Web generated client stub for proto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


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
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoLogin = new grpcWeb.AbstractClientBase.MethodInfo(
    AuthResponse,
    (request: LoginRequest) => {
      return request.serializeBinary();
    },
    AuthResponse.deserializeBinary
  );

  login(
    request: LoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<AuthResponse>;

  login(
    request: LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AuthResponse) => void): grpcWeb.ClientReadableStream<AuthResponse>;

  login(
    request: LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: AuthResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.AuthService/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.AuthService/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

  methodInfoSignup = new grpcWeb.AbstractClientBase.MethodInfo(
    AuthResponse,
    (request: SignupRequest) => {
      return request.serializeBinary();
    },
    AuthResponse.deserializeBinary
  );

  signup(
    request: SignupRequest,
    metadata: grpcWeb.Metadata | null): Promise<AuthResponse>;

  signup(
    request: SignupRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AuthResponse) => void): grpcWeb.ClientReadableStream<AuthResponse>;

  signup(
    request: SignupRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: AuthResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.AuthService/Signup',
        request,
        metadata || {},
        this.methodInfoSignup,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.AuthService/Signup',
    request,
    metadata || {},
    this.methodInfoSignup);
  }

  methodInfoUsernameUsed = new grpcWeb.AbstractClientBase.MethodInfo(
    UsedResponse,
    (request: UsernameUsedRequest) => {
      return request.serializeBinary();
    },
    UsedResponse.deserializeBinary
  );

  usernameUsed(
    request: UsernameUsedRequest,
    metadata: grpcWeb.Metadata | null): Promise<UsedResponse>;

  usernameUsed(
    request: UsernameUsedRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UsedResponse) => void): grpcWeb.ClientReadableStream<UsedResponse>;

  usernameUsed(
    request: UsernameUsedRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: UsedResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.AuthService/UsernameUsed',
        request,
        metadata || {},
        this.methodInfoUsernameUsed,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.AuthService/UsernameUsed',
    request,
    metadata || {},
    this.methodInfoUsernameUsed);
  }

  methodInfoEmailUsed = new grpcWeb.AbstractClientBase.MethodInfo(
    UsedResponse,
    (request: EmailUsedRequest) => {
      return request.serializeBinary();
    },
    UsedResponse.deserializeBinary
  );

  emailUsed(
    request: EmailUsedRequest,
    metadata: grpcWeb.Metadata | null): Promise<UsedResponse>;

  emailUsed(
    request: EmailUsedRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UsedResponse) => void): grpcWeb.ClientReadableStream<UsedResponse>;

  emailUsed(
    request: EmailUsedRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: UsedResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.AuthService/EmailUsed',
        request,
        metadata || {},
        this.methodInfoEmailUsed,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.AuthService/EmailUsed',
    request,
    metadata || {},
    this.methodInfoEmailUsed);
  }

  methodInfoAuthUser = new grpcWeb.AbstractClientBase.MethodInfo(
    AuthUserResponse,
    (request: AuthUserRequest) => {
      return request.serializeBinary();
    },
    AuthUserResponse.deserializeBinary
  );

  authUser(
    request: AuthUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<AuthUserResponse>;

  authUser(
    request: AuthUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AuthUserResponse) => void): grpcWeb.ClientReadableStream<AuthUserResponse>;

  authUser(
    request: AuthUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: AuthUserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.AuthService/AuthUser',
        request,
        metadata || {},
        this.methodInfoAuthUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.AuthService/AuthUser',
    request,
    metadata || {},
    this.methodInfoAuthUser);
  }

}

