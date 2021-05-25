import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {AlertOptions} from '../../models/alert-options';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  readonly defaultToastOptions: Partial<AlertOptions>;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.defaultToastOptions = {
      duration: 5000
    };
  }

  createAlert(options: AlertOptions, roleHandlers: { [id: string]: () => void }): Promise<HTMLIonAlertElement> {

    for (const role of Object.keys(roleHandlers)) {

      const button = this.findButtonWithRole(options, role);

      if (!button) {
        throw new Error(`No button specified with role ${role}`)
      }

      button.handler = roleHandlers[role];
    }

    return this.alertCtrl.create(options);
  }

  createToast(options: AlertOptions, roleHandlers?: { [id: string]: () => void }): Promise<HTMLIonToastElement> {

    const toastOptions = {
      ...this.defaultToastOptions,
      ...options
    };

    if (roleHandlers){
      for (const role of Object.keys(roleHandlers)) {

        const button = this.findButtonWithRole(toastOptions, role);

        if (!button) {
          throw new Error(`No button specified with role ${role}`)
        }

        button.handler = roleHandlers[role];
      }
    }

    return this.toastCtrl.create(toastOptions);
  }

  info(message: string): Promise<HTMLIonToastElement> {
    return this.createToast({
      message
    });
  }

  async success(message: string, present?: boolean): Promise<HTMLIonToastElement> {
    const toast = this.createToast({
      message,
      color: 'success'
    });

    if (present){
      await (await toast).present();
    }

    return toast;
  }

  error(message: string): Promise<HTMLIonToastElement> {
    return this.createToast({
      message,
      color: 'danger'
    });
  }

  findButtonWithRole(options: AlertOptions, role: string) {
    return options.buttons ? options.buttons.find(button => button.role === role) : null;
  }

}
