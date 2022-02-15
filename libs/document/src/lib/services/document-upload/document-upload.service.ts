import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Document} from "@homecare/shared";
import {HttpClient} from "@angular/common/http";
import {ApiUrlService} from "@homecare/common";
import {map, tap} from "rxjs/operators";
import {DocumentsService} from "../../store/entity/services/documents/documents.service";

@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {

  constructor(protected httpClient: HttpClient,
              protected apiUrlService: ApiUrlService,
              protected documentsService: DocumentsService) {
  }

  upload(formData: FormData): Observable<Document> {

    return this.httpClient.post(this.url(), formData).pipe(
      map((response: any) => {
        console.log('Upload response', response);
        return response?.data as Document;
      }),
      tap(document => {
        if (document){
          this.documentsService.addOneToCache(document);
        }
      })
    );

  }

  url(): string {
    return this.apiUrlService.url('documents');
  }
}
