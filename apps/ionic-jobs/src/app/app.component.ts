import {Component, NgZone} from '@angular/core';
import {LoadingController, Platform} from '@ionic/angular';
import {Auth0Service} from "@homecare/auth0";
import {EntitySyncService} from "@homecare/entity";
import {CoreEntity, PlatformService} from "@homecare/core";
import {filter, tap} from "rxjs/operators";

import {App} from '@capacitor/app';
import {Browser} from "@capacitor/browser";
import {SplashScreen} from "@ionic-native/splash-screen";
import {selectIsEntitySyncLoading} from "../../../../libs/entity/src/lib/store/selectors/entity-sync.selectors";

@Component({
  selector: 'homecare-nx-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  isLoading = false;
  loadingEl: HTMLIonLoadingElement;

  constructor(
    public platformService: PlatformService,
    private platform: Platform,
    private zone: NgZone,
    private auth0Service: Auth0Service,
    private entitySyncService: EntitySyncService,
    private loadingCtrl: LoadingController) {
    this.initializeApp().then(() => {
    });
  }

  async initializeApp() {

    // console.log('initializeApp');
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

    this.auth0Service.isAuthenticated$.pipe(
      filter(isAuthenticated => isAuthenticated)
    ).subscribe(() => {
      this.entitySyncService.init(CoreEntity.AppDataId);
    });


    this.entitySyncService.isLoading$.subscribe(async isLoading => {

      console.log('ENTITY LOAD CHANGE', isLoading, this.isLoading);

      if (isLoading) {

        if (!this.isLoading) {

          this.isLoading = true;

          this.loadingEl = await this.loadingCtrl.create({
            message: 'Connecting to server...',
            duration: 1000
          });

          // if this.isLoading has changed during async pause, dismiss.
          if (!this.isLoading){
            await this.dismissLoader();
            return;
          }

          await this.loadingEl.present();

          // if this.isLoading has changed after async pause, dismiss

          if (!this.isLoading){
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
    await SplashScreen.hide();
  }

  private async handleUrlOpen(data: any) {

    // await Browser.close();

    if (this.auth0Service.isCallback(data.url)) {
      console.log('Handling Auth0 Callback');
      this.auth0Service.handleCallback(data.url);
    } else {
      console.log('Not an Auth0 callback. Black hole.', data);
    }

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
