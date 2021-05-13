import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Base Data Error Service for handling server side errors
 */
@Injectable({
  providedIn: 'root'
})
export class DataErrorService {

  constructor() {
  }

  public handleHttpError(response: HttpErrorResponse): void {

  }

  protected getErrors(response: HttpErrorResponse): void | string | string[] {

  }
}
