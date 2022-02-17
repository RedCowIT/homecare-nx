import {Component, OnInit} from '@angular/core';
import {TokenAuthService} from "@homecare-nx/auth";

@Component({
  selector: 'hc-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.css'],
})
export class LogoutPage implements OnInit {

  constructor(private authService: TokenAuthService) { }

  ngOnInit() {
    this.authService.logout();
  }

}
