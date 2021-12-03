import { Component, OnInit } from '@angular/core';
import {Auth0Service} from "@homecare/auth0";

@Component({
  selector: 'hc-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.css'],
})
export class LogoutPage implements OnInit {

  constructor(private auth0Service: Auth0Service) { }

  ngOnInit() {
    this.auth0Service.logout();
  }

}
