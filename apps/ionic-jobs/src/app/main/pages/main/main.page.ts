import { Component, OnInit } from '@angular/core';
import {Auth0Service} from "@homecare/auth0";
import {PlatformService} from "@homecare/core";

@Component({
  selector: 'hc-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(public auth0Service: Auth0Service, public platform: PlatformService) { }

  ngOnInit() {

  }

}
