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
      if (this.username.length < 5) {
        this.valid.username = false;
      } else {
        this.valid.username = usernamePattern.test(this.username);
      }
    } else if (type === 'email') {
      this.valid.email = emailPattern.test(this.email);
    } else if (type === ('confirmPassword' || 'password')) {
      if (this.password.length < 5) {
        this.valid.password = false;
      } else {
        this.valid.password = this.password === this.confirmPassword;
      }
    }
  }

  change(e: any, type: string) {
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

    if (this.valid.username && this.valid.email && this.valid.password) {
      alert('Your account has been created!');
    }
  }
}
