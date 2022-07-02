import {Component, NgZone} from '@angular/core';
import {LoadingController, Platform} from '@ionic/angular';
import {EntitySyncService} from "@homecare/entity";
import {CoreEntity, NetworkConnectivityService, PlatformService} from "@homecare/core";
import {distinct, distinctUntilChanged, filter} from "rxjs/operators";

import {App} from '@capacitor/app';
import {SplashScreen} from "@ionic-native/splash-screen";
import {TokenAuthService} from "@homecare-nx/auth";
import {Router} from "@angular/router";
import {ScreenOrientation} from "@awesome-cordova-plugins/screen-orientation/ngx";

@Component({
  selector: 'homecare-nx-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  isLoading = false;
  loadingEl: HTMLIonLoadingElement;
  networkOnline = true;

  constructor(
    public platformService: PlatformService,
    private platform: Platform,
    private zone: NgZone,
    private authService: TokenAuthService,
    private entitySyncService: EntitySyncService,
    private networkConnectivityService: NetworkConnectivityService,
    private loadingCtrl: LoadingController,
    private screenOrientation: ScreenOrientation,
    private router: Router) {
    this.initializeApp().then(() => {
    });
  }

  async initializeApp() {

    App.addListener('appUrlOpen', async (data: any) => {
      await this.zone.run(async () => {
        await this.handleUrlOpen(data);
      });
    });


    this.platform.ready().then(async () => {
      if (this.platform.is('capacitor')) {
        await this.initCapacitor();
      }
    });

    this.authService.isAuthenticated$.pipe(
      filter(isAuthenticated => isAuthenticated)
    ).subscribe((isAuthenticated) => {
      this.entitySyncService.init(CoreEntity.AppDataId);
    });

    this.networkConnectivityService.isOnline$.pipe(
      distinctUntilChanged()
    ).subscribe(isOnline => {
      this.networkOnline = isOnline;
    });

    this.entitySyncService.isLoading$.subscribe(async isLoading => {

      if (isLoading) {

        if (!this.isLoading) {

          this.isLoading = true;

          this.loadingEl = await this.loadingCtrl.create({
            message: 'Connecting to server...',
            duration: 1000
          });

          // if this.isLoading has changed during async pause, dismiss.
          if (!this.isLoading) {
            await this.dismissLoader();
            return;
          }

          await this.loadingEl.present();

          // if this.isLoading has changed after async pause, dismiss

          if (!this.isLoading) {
            await this.dismissLoader();
            return;
          }

        }

      } else {

        this.isLoading = false;

        await this.dismissLoader();

      }
    });
  }

  ngAfterViewInit() {

  }

  private async initCapacitor() {
    // await StatusBar.setStyle({
    //   style: StatusBarStyle.Dark,
    // });

    // await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    await SplashScreen.hide();
  }

  private async handleUrlOpen(data: any) {

    // await Browser.close();

    // if (this.auth0Service.isCallback(data.url)) {
    //   this.auth0Service.handleCallback(data.url);
    // } else {

    // }

    // Example url: https://beerswift.app/tabs/tab2
    // slug = /tabs/tab2

    //const slug = data.url.split(".app").pop();

    //if (slug) {
    // this.router.navigateByUrl(slug);
    //}
    // If no match, do nothing - let regular routing
    // logic take over
  }

  async dismissLoader() {
    if (this.loadingEl) {

      await this.loadingEl.dismiss();

      if (!this.isLoading) {
        // this.loadingEl = null;
      }
    }
  }
}
