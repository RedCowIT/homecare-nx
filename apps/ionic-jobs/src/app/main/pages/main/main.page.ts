import { Component, OnInit } from '@angular/core';
import {Auth0Service} from "@homecare/auth0";

@Component({
  selector: 'hc-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.css'],
})
export class MainPage implements OnInit {

  constructor(public auth0Service: Auth0Service) { }

  ngOnInit() {
  }

}
