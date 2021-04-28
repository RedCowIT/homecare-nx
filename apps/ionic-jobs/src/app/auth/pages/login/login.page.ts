import {Component, OnInit} from '@angular/core';
import {Auth0Service} from '@homecare/auth0';

@Component({
  selector: 'hc-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {

  constructor(private authService: Auth0Service) {
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log('LoginPage.ionViewWillEnter');
    // this.authService.login();
  }

}
