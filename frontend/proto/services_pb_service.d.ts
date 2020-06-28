// package: proto
// file: proto/services.proto

import * as proto_services_pb from "../proto/services_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AuthServiceLogin = {
  readonly methodName: string;
  readonly service: typeof AuthService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_services_pb.LoginRequest;
  readonly responseType: typeof proto_services_pb.AuthResponse;
};

type AuthServiceSignup = {
  readonly methodName: string;
  readonly service: typeof AuthService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_services_pb.SignupRequest;
  readonly responseType: typeof proto_services_pb.AuthResponse;
};

type AuthServiceUsernameUsed = {
  readonly methodName: string;
  readonly service: typeof AuthService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_services_pb.UsernameUsedRequest;
  readonly responseType: typeof proto_services_pb.UsedResponse;
};

type AuthServiceEmailUsed = {
  readonly methodName: string;
  readonly service: typeof AuthService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_services_pb.EmailUsedRequest;
  readonly responseType: typeof proto_services_pb.UsedResponse;
};

type AuthServiceAuthUser = {
  readonly methodName: string;
  readonly service: typeof AuthService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_services_pb.AuthUserRequest;
  readonly responseType: typeof proto_services_pb.AuthUserResponse;
};

export class AuthService {
  static readonly serviceName: string;
  static readonly Login: AuthServiceLogin;
  static readonly Signup: AuthServiceSignup;
  static readonly UsernameUsed: AuthServiceUsernameUsed;
  static readonly EmailUsed: AuthServiceEmailUsed;
  static readonly AuthUser: AuthServiceAuthUser;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class AuthServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  login(
    requestMessage: proto_services_pb.LoginRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_services_pb.AuthResponse|null) => void
  ): UnaryResponse;
  login(
    requestMessage: proto_services_pb.LoginRequest,
    callback: (error: ServiceError|null, responseMessage: proto_services_pb.AuthResponse|null) => void
  ): UnaryResponse;
  signup(
    requestMessage: proto_services_pb.SignupRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_services_pb.AuthResponse|null) => void
  ): UnaryResponse;
  signup(
    requestMessage: proto_services_pb.SignupRequest,
    callback: (error: ServiceError|null, responseMessage: proto_services_pb.AuthResponse|null) => void
  ): UnaryResponse;
  usernameUsed(
    requestMessage: proto_services_pb.UsernameUsedRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_services_pb.UsedResponse|null) => void
  ): UnaryResponse;
  usernameUsed(
    requestMessage: proto_services_pb.UsernameUsedRequest,
    callback: (error: ServiceError|null, responseMessage: proto_services_pb.UsedResponse|null) => void
  ): UnaryResponse;
  emailUsed(
    requestMessage: proto_services_pb.EmailUsedRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_services_pb.UsedResponse|null) => void
  ): UnaryResponse;
  emailUsed(
    requestMessage: proto_services_pb.EmailUsedRequest,
    callback: (error: ServiceError|null, responseMessage: proto_services_pb.UsedResponse|null) => void
  ): UnaryResponse;
  authUser(
    requestMessage: proto_services_pb.AuthUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_services_pb.AuthUserResponse|null) => void
  ): UnaryResponse;
  authUser(
    requestMessage: proto_services_pb.AuthUserRequest,
    callback: (error: ServiceError|null, responseMessage: proto_services_pb.AuthUserResponse|null) => void
  ): UnaryResponse;
}

