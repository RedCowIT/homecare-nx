import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {containsString} from "@homecare/shared";

@Injectable({
  providedIn: "root"
})
export class PlatformService {

  public readonly isMobile: boolean;
  public isPortrait: boolean;

  constructor(private platform: Platform) {

    this.isMobile = this.isMobilePlatform();
    this.isPortrait = this.isWindowPortrait();

    window.addEventListener("orientationchange", () => {
      this.isPortrait = this.isWindowPortrait();
    }, false);
  }

  protected isMobilePlatform(): boolean {
    const platforms = this.platform.platforms();
    return containsString(platforms, 'mobile') && !containsString(platforms, 'tablet');
  }

  protected isWindowPortrait(): boolean {
    return window?.screen?.orientation.type.includes('portrait');
  }
}
