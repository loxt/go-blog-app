import { Component, OnInit } from '@angular/core';
import { AuthServiceClient } from '../../../proto/services_pb_service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(AuthServiceClient);
  }
}
