import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrlService} from "@homecare/common";
import {DocumentsService} from "@homecare-nx/document";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class EmailInvoiceService {

  constructor(protected httpClient: HttpClient,
              protected apiUrlService: ApiUrlService,
              protected documentsService: DocumentsService) {
  }

  send(invoiceId: number, email: string): Observable<boolean> {

    return this.httpClient.post(this.url(invoiceId), {
      toAddress: email
    }).pipe(
      map((response: any) => {
        return true;
      })
    );

  }

  url(invoiceId: number): string {
    return this.apiUrlService.url('invoices/' + invoiceId + '/sendEmail');
  }

}
