import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AuthServiceClient } from '../../proto/services_grpc_web_pb';
import { LoginRequest } from '../../proto/services_pb';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    const authClient = new AuthServiceClient('http://localhost:9001');
    const req = new LoginRequest();
    req.setLogin('example');
    req.setPassword('example');
    authClient.login(req, {}, (err, res) => {
      console.log(err, res);
    });
  }
}
