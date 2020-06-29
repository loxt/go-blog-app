import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  valid = {
    username: true,
    password: true,
    email: true,
  };

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
      this.username === '' ||
      this.email === '' ||
      this.password === '' ||
      this.confirmPassword === ''
    ) {
      console.log('campos em branco');
    } else if (this.valid.username && this.valid.email && this.valid.password) {
      console.log('Sucesso');
    }
  }
}
