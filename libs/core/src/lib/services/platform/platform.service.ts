import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {containsString} from "@homecare/shared";

@Injectable({
  providedIn: "root"
})
export class PlatformService {

  public readonly isMobile: boolean;

  constructor(private platform: Platform) {
    this.isMobile = this.isMobilePlatform();
  }

  protected isMobilePlatform(): boolean {
    const platforms = this.platform.platforms();
    return containsString(platforms, 'mobile') && !containsString(platforms, 'tablet');
  }
}
