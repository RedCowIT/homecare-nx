
import {Injectable} from '@angular/core';

@Injectable()
export class ApiUrlService {

  constructor(private readonly root: string) {
  }

  url(uri: string) {
    if (!uri || uri === '') {
      throw new Error('Cannot generate Api Url with empty uri. If you intend to fetch root, use url("/").');
    }

    if (uri.charAt(0) !== '/') {
      return this.root + '/' + uri;
    }

    return this.root + uri;
  }
}
