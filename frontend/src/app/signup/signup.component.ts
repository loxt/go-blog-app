import { Component, OnInit } from '@angular/core';
import {
  AuthUserRequest,
  SignupRequest,
  EmailUsedRequest,
  UsernameUsedRequest,
} from '../../../proto/services_pb';
import { AuthServiceClient } from '../../../proto/services_grpc_web_pb';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authClient = new AuthServiceClient('http://localhost:9001');
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  valid = {
    username: true,
    password: true,
    email: true,
  };

  error: string = null;

  constructor() {}

  ngOnInit(): void {}

  validate(type: string): void {
    const usernamePattern = /^[\w-.]*$/;
    const emailPattern = /\S+@\S+\.\S+/;

    if (type === 'username') {
      if (this.username.length < 5 || this.username.length > 20) {
        this.valid.username = false;
      } else {
        this.valid.username = usernamePattern.test(this.username);
      }
    } else if (type === 'email') {
      if (this.email.length < 7 || this.email.length > 65) {
        this.valid.email = false;
      } else {
        this.valid.email = emailPattern.test(this.email);
      }
    } else if (type === ('confirmPassword' || 'password')) {
      if (this.password.length < 8 || this.password.length > 128) {
        this.valid.password = false;
      } else {
        this.valid.password = this.password === this.confirmPassword;
      }
    }
  }

  onKey(e: any, type: string) {
    this.error = null;
    if (type === 'username') {
      this.username = e.target.value;
    } else if (type === 'email') {
      this.email = e.target.value;
    } else if (type === 'password') {
      this.password = e.target.value;
    } else if (type === 'confirmPassword') {
      this.confirmPassword = e.target.value;
    }

    this.validate(type);
  }
  onSubmit(e: Event) {
    e.preventDefault();
    if (
      this.username.length === 0 ||
      this.email.length === 0 ||
      this.password.length === 0 ||
      this.confirmPassword.length === 0
    ) {
      this.error = 'Fill in the empty fields';
    } else if (this.valid.username && this.valid.email && this.valid.password) {
      if (this.checkIfIsUsed() === false) {
        const req = new SignupRequest();
        req.setUsername(this.username);

        req.setEmail(this.email);
        req.setPassword(this.password);

        this.authClient.signup(req, {}, (err, res) => {
          if (err) return (this.error = err.message);
          localStorage.setItem('token', res.getToken());
          const authReq = new AuthUserRequest();
          authReq.setToken(res.getToken());
          this.authClient.authUser(authReq, {}, (err, res) => {
            if (err) return (this.error = err.message);

            const user = {
              id: res.getId(),
              username: res.getUsername(),
              email: res.getEmail(),
            };
            localStorage.setItem('user', JSON.stringify(user));
          });

          this.error = 'Account created!';
        });
      }
    }
  }

  checkIfIsUsed(): boolean {
    const req = new UsernameUsedRequest();
    const req2 = new EmailUsedRequest();
    req.setUsername(this.username);
    this.authClient.usernameUsed(req, {}, (err, res) => {
      if (err) return (this.error = err.message);
      if (res.getUsed()) {
        this.error = 'This username is already in use. Please choose another.';
        return true;
      }
    });
    req2.setEmail(this.email);

    this.authClient.emailUsed(req2, {}, (err, res) => {
      if (err) return (this.error = err.message);
      if (res.getUsed()) {
        this.error = 'This e-mail is already in use. Please choose another.';
        return true;
      }
    });

    return false;
  }
}
