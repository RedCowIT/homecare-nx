import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {DataErrorService, LoggerService} from "@homecare/core";
import {TokenAuthService} from "@homecare-nx/auth";
import {environment} from "../../../environments/environment";
import * as Sentry from "@sentry/angular";

/**
 * App Data Error Service for handling server side errors
 */
@Injectable({
  providedIn: 'root'
})
export class AppDataErrorService extends DataErrorService {

  constructor(private authService: TokenAuthService,
              private toastCtrl: ToastController,
              private router: Router,
              private logger: LoggerService) {
    super();
  }

  public handleHttpError(response: any): void {

    super.handleHttpError(response);

    this.logger.error('DataHttpError', response);

    switch (response.status) {
      case 401:
        this.unauthorized();
        break;
      case 422:
        this.validationError(response);
        break;
      case 403:
      case 404:
      case 500:
        this.serverError(response);
        break;
      default:
        this.unhandledHttpError(response);
    }
  }


  handleDataServiceError(error: any) {

    this.logger.error('DataServiceError', error);

    if (error?.status === 500){
      try {
        if (environment.sentry.enabled){
          Sentry.captureException(error?.error);
        }
      } catch (e) {
        console.error(e);
      }
    }

    this.serverError(error);
  }

  /**
   * Unauthorized from server, log and boot out.
   * TODO: log out
   */
  private unauthorized() {

    console.error('unauthorized');

    this.authService.logout();

  }

  /**
   * Noop. Components interested in these should catch via entity service errors$
   */
  private validationError(error: HttpErrorResponse) {

  }

  private async serverError(error: HttpErrorResponse) {
    const toast = await this.toastCtrl.create({
      color: 'danger',
      message: 'There was an issue talking to our servers, please try again. (' + error.status + ')',
      duration: 5000,
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }

  /**
   * Catch all data error handler
   *
   * Notify remote log and analytics
   */
  private unhandledHttpError(error: HttpErrorResponse) {

    console.log('unhandled http error');

  }
}

