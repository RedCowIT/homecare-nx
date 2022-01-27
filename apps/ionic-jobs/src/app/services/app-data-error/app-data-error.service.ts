import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Auth0Service} from "@homecare/auth0";
import {DataErrorService, LoggerService} from "@homecare/core";

/**
 * App Data Error Service for handling server side errors
 */
@Injectable({
  providedIn: 'root'
})
export class AppDataErrorService extends DataErrorService {

  constructor(private authService: Auth0Service,
              private toastCtrl: ToastController,
              private router: Router,
              private logger: LoggerService) {
    super();
  }

  public handleHttpError(error: HttpErrorResponse): void {

    super.handleHttpError(error);

    this.logger.error('DataHttpError', error);

    switch (error.status) {
      case 401:
        this.unauthorized();
        break;
      case 422:
        this.validationError(error);
        break;
      case 403:
      case 404:
      case 500:
        this.serverError(error);
        break;
      default:
        this.unhandledHttpError(error);
    }
  }


  handleDataServiceError(error: any) {

    this.logger.error('DataServiceError', error);

    this.serverError(error);
  }

  /**
   * Unauthorized from server, log and boot out.
   * TODO: log out
   */
  private unauthorized() {

    console.error('unauthorized');

    this.authService.logout();
    this.router.navigateByUrl('/logout');
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
