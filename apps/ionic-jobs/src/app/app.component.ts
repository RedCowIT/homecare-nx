import {Component, NgZone} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Browser, Plugins, StatusBarStyle} from '@capacitor/core';
import {Auth0Service} from "@homecare/auth0";
import {EntitySyncService} from "@homecare/entity";
import {CoreEntity, PlatformService} from "@homecare/core";
import {filter} from "rxjs/operators";

const {StatusBar, SplashScreen} = Plugins;

const {App} = Plugins;

@Component({
  selector: 'homecare-nx-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    public platformService: PlatformService,
    private platform: Platform,
    private zone: NgZone,
    private auth0Service: Auth0Service,
    private entitySyncService: EntitySyncService) {
    this.initializeApp();
  }

  initializeApp() {

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

    // TODO: only trigger after authenticated
    this.auth0Service.isAuthenticated$.pipe(
      filter(isAuthenticated => isAuthenticated)
    ).subscribe(() => {
      this.entitySyncService.init(CoreEntity.AppDataId);
    })
  }

  ngAfterViewInit() {

  }

  private async initCapacitor(){
    await StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });
    await SplashScreen.hide();
  }

  private async handleUrlOpen(data: any){

    await Browser.close();

    if (this.auth0Service.isCallback(data.url)) {
      this.auth0Service.handleCallback(data.url);
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
}
