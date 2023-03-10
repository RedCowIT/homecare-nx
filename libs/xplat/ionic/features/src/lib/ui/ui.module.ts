import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { UIModule as UIWebModule } from '@homecare-nx/xplat/web/features';
import { HeaderComponent } from './components';

@NgModule({
  imports: [UIWebModule, IonicModule],
  declarations: [HeaderComponent],
  exports: [UIWebModule, IonicModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UIModule {}
