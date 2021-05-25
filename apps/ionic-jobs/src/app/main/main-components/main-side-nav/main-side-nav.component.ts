import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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
      icon: 'document-text',
      label: 'Docs',
      route: '/main/docs'
    },
    {
      icon: 'chatbubble-ellipses',
      label: 'Messages',
      route: '/main/messages'
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
