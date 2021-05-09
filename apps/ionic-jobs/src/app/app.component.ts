import {Component, NgZone} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Browser, Plugins, StatusBarStyle} from '@capacitor/core';
import {Auth0Service} from "@homecare/auth0";

const {StatusBar, SplashScreen} = Plugins;

const {App} = Plugins;

@Component({
  selector: 'homecare-nx-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private zone: NgZone,
    private auth0Service: Auth0Service) {
    this.initializeApp();
  }

  initializeApp() {

    App.addListener('appUrlOpen', (data: any) => {
      this.zone.run(async () => {

        console.log('appUrlOpen', data, Browser?._lastWindow);
        if (Browser._lastWindow) {
          Browser._lastWindow.close();
        }
        Browser.close();

        if (this.auth0Service.isCallback(data.url)) {
          console.log('is auth callback!');
          this.auth0Service.handleCallback(data.url);
        } else {
          console.log('is not an auth callback');
        }

        // await Browser.close();

        // Example url: https://beerswift.app/tabs/tab2
        // slug = /tabs/tab2

        //const slug = data.url.split(".app").pop();

        //if (slug) {
        // this.router.navigateByUrl(slug);
        //}
        // If no match, do nothing - let regular routing
        // logic take over

      });
    });

    this.platform.ready().then(async () => {
      if (this.platform.is('capacitor')) {
        await StatusBar.setStyle({
          style: StatusBarStyle.Dark,
        });
        await SplashScreen.hide();
      }
    });
  }

  ngAfterViewInit() {

    // ({}).subscribe(match => {
    //   // match.$route - the route we matched, which is the matched entry from the arguments to route()
    //   // match.$args - the args passed in the link
    //   // match.$link - the full link data
    //   console.log('Successfully matched route', match);
    // }, nomatch => {
    //   // nomatch.$link - the full link data
    //   console.error('Got a deeplink that didn\'t match', nomatch);
    // });
  }
}
