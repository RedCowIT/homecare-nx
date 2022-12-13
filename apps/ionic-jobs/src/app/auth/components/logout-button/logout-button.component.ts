import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PlatformService} from "@homecare/core";

@Component({
  selector: 'hc-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(public router: Router, public platformService: PlatformService) { }

  ngOnInit(): void {
  }

  async logout(){
    await this.router.navigateByUrl('/logout');
  }
}
