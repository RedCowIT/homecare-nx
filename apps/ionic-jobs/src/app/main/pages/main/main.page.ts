import { Component, OnInit } from '@angular/core';
import {Auth0Service} from "@homecare/auth0";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'hc-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.css'],
})
export class MainPage implements OnInit {

  constructor(public auth0Service: Auth0Service, public platform: Platform) { }

  ngOnInit() {

  }

}
