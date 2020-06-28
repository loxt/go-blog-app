// package: proto
// file: proto/services.proto

var proto_services_pb = require("../proto/services_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var AuthService = (function () {
  function AuthService() {}
  AuthService.serviceName = "proto.AuthService";
  return AuthService;
}());

AuthService.Login = {
  methodName: "Login",
  service: AuthService,
  requestStream: false,
  responseStream: false,
  requestType: proto_services_pb.LoginRequest,
  responseType: proto_services_pb.AuthResponse
};

AuthService.Signup = {
  methodName: "Signup",
  service: AuthService,
  requestStream: false,
  responseStream: false,
  requestType: proto_services_pb.SignupRequest,
  responseType: proto_services_pb.AuthResponse
};

AuthService.UsernameUsed = {
  methodName: "UsernameUsed",
  service: AuthService,
  requestStream: false,
  responseStream: false,
  requestType: proto_services_pb.UsernameUsedRequest,
  responseType: proto_services_pb.UsedResponse
};

AuthService.EmailUsed = {
  methodName: "EmailUsed",
  service: AuthService,
  requestStream: false,
  responseStream: false,
  requestType: proto_services_pb.EmailUsedRequest,
  responseType: proto_services_pb.UsedResponse
};

AuthService.AuthUser = {
  methodName: "AuthUser",
  service: AuthService,
  requestStream: false,
  responseStream: false,
  requestType: proto_services_pb.AuthUserRequest,
  responseType: proto_services_pb.AuthUserResponse
};

exports.AuthService = AuthService;

function AuthServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AuthServiceClient.prototype.login = function login(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AuthService.Login, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AuthServiceClient.prototype.signup = function signup(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AuthService.Signup, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AuthServiceClient.prototype.usernameUsed = function usernameUsed(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AuthService.UsernameUsed, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AuthServiceClient.prototype.emailUsed = function emailUsed(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AuthService.EmailUsed, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AuthServiceClient.prototype.authUser = function authUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AuthService.AuthUser, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.AuthServiceClient = AuthServiceClient;

