import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) {
  }

  upload(url: string, formData: FormData): Observable<File> {

    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'multipart/form-data');
    // const contentType = 'multipart/form-data; charset=utf-8;';
    // const headers = {'Content-Type': contentType};

    return this.http.post(url, formData).pipe(
      map((response: any) => {
        return response.data as File;
      })
    );

  }
}
