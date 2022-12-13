import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {StoreLogsComponent} from "../store-logs/store-logs.component";
import {PlatformService} from "@homecare/core";

@Component({
  selector: 'hc-main-side-nav',
  templateUrl: './main-side-nav.component.html',
  styleUrls: ['./main-side-nav.component.scss']
})
export class MainSideNavComponent implements OnInit {

  items = [
    {
      icon: 'layers',
      label: 'Jobs',
      route: '/main/jobs'
    },
    {
      icon: 'construct',
      label: 'My Stock',
      route: '/main/stock'
    },
    {
      icon: 'calendar',
      label: 'My Week',
      route: '/main/appointment-summary'
    },
    {
      icon: 'card',
      label: 'Payments',
      route: '/main/payments'
    },
    {
      icon: 'newspaper-outline',
      label: 'Invoices',
      route: '/main/invoices'
    },
    {
      icon: 'help-circle',
      label: 'Docs',
      route: '/main/docs'
    },
    // {
    //   icon: 'chatbubble-ellipses',
    //   label: 'Messages',
    //   route: '/main/messages'
    // }
  ]

  constructor(private router: Router,
              public modalCtrl: ModalController,
              public platformService: PlatformService) { }

  ngOnInit(): void {
  }

  async openStoreLogs(){
    const modal = await this.modalCtrl.create({
      component: StoreLogsComponent,
      cssClass: 'fullscreen'
    });

    await modal.present();
  }
}
