import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  static API_URL = "https://ionic-booking-app-1-default-rtdb.firebaseio.com";

  constructor() {
  }

  ngOnInit() {
  }
}
