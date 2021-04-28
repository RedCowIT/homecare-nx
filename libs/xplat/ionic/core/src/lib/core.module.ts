import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { throwIfAlreadyLoaded } from '@homecare-nx/xplat/utils';
import { HomecareNxCoreModule } from '@homecare-nx/xplat/web/core';

@NgModule({
  imports: [HomecareNxCoreModule, IonicModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
})
export class HomecareNxIonicCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: HomecareNxIonicCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'HomecareNxIonicCoreModule');
  }
}
