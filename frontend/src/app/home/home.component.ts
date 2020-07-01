import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: string = localStorage.getItem('user');
  user: boolean = null;
  ngOnInit(): void {
    this.user = localStorage.getItem('user') != null;
  }

  constructor() {}

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user = false;
  }
}
