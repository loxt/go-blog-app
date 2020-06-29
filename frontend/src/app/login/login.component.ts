import { Component, OnInit } from '@angular/core';
import { AuthServiceClient } from '../../../proto/services_grpc_web_pb';
import { AuthUserRequest, LoginRequest } from '../../../proto/services_pb';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(e: Event) {
    e.preventDefault();
    const authClient = new AuthServiceClient('http://localhost:9001');
    const req = new LoginRequest();
    req.setLogin(this.username);
    req.setPassword(this.password);
    authClient.login(req, {}, (err, res) => {
      if (err) return alert(err.message);

      localStorage.setItem('token', res.getToken());
      const req = new AuthUserRequest();
      req.setToken(res.getToken());

      authClient.authUser(req, {}, (err, res) => {
        if (err) return alert(err.message);

        const user = {
          id: res.getId(),
          username: res.getUsername(),
          email: res.getEmail(),
        };
        localStorage.setItem('user', JSON.stringify(user));
      });
    });
  }

  onKey(e: any, type: string) {
    if (type === 'username') {
      this.username = e.target.value;
    } else if (type === 'password') {
      this.password = e.target.value;
    }
  }
}
