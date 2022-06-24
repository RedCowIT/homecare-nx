import {Component, OnInit} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {TokenAuthService} from "@homecare-nx/auth";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";


@Component({
  selector: 'hc-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertCtrl: AlertController,
              private authService: TokenAuthService,
              private router: Router) {
  }

  ngOnInit() {

    // Skip if we're already authenticated
    this.authService.isAuthenticated$.pipe(first()).subscribe(
      isAuthenticated => {
        if (isAuthenticated){
          this.router.navigateByUrl('/');
        }
      }
    )

  }

  ionViewWillEnter() {

    // this.authService.login();
  }

  async forgotPassword() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot password',
      message: 'Please call the office on:<br><strong>0123 456 7890</strong>',
      buttons: [
        {
          text: 'Close',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }
}
