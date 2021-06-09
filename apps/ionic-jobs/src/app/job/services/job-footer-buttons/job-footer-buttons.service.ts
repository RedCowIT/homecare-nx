import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";

@Injectable({
  providedIn: 'root'
})
export class JobFooterButtonsService {

  buttonConfigs$ = new BehaviorSubject<ButtonConfig[]>([]);

  setButtons(buttonConfigs: ButtonConfig[]){
    this.buttonConfigs$.next(buttonConfigs);
  }

  clearButtons(){
    this.buttonConfigs$.next([]);
  }
}
