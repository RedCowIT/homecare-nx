import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {Inject, Injectable} from '@angular/core';
import {CLIENT_STORAGE} from '../../tokens/storage.token';
import {ClientStorage} from './client-storage';

/**
 * Generic StorageService.
 *
 * Wraps Storage interface and implements full type serialization/deserialization.
 *
 * All methods return an Observable.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * The namespace key for storage, i.e. namespace.key = value
   */
  nameSpace: string;

  constructor(@Inject(CLIENT_STORAGE) private storage: ClientStorage, nameSpace: string = 'app') {
    this.nameSpace = nameSpace;
  }

  // Set Overloads
  set<T>(key: string, value: T[]): Observable<any>;

  // tslint:disable-next-line:unified-signatures
  set<T>(key: string, value: T): Observable<any>;

  /**
   * Serializes a class of type T or T[] to JSON and saves to storage
   *
   * Saving a null value for a key will remove the entire key from storage.
   */
  set<T>(key: string, value: T | T[]): Observable<any> {

    console.log('set',{key, value});
    if (value === null) {
      return fromPromise(this.storage.remove(key));
    }

    const jsonStr = this.serialize(value); // works with primitives

    const itemKey = this.getItemKey(key);

    return fromPromise(this.storage.set(itemKey, jsonStr));
  }


  /**
   * Reads an object from storage, deserializing to Type T.
   *
   * All type properties are not enforced, so the underlying object could have different properties.
   * This is just a helper to get JSON back to a usable instance.
   *
   * To convert an object into the appropriate Type, ensure you pass the cls param.
   */
  get<T>(key: string): Observable<T> {
    const itemKey = this.getItemKey(key);

    return fromPromise(this.storage.get(itemKey)).pipe(
      map((serializedStr: string) => {

        if (!serializedStr) {
          return serializedStr;
        }

        return JSON.parse(serializedStr);

      })
    );
  }

  getArray<T>(key: string): Observable<T[]> {
    const itemKey = this.getItemKey(key);

    return fromPromise(this.storage.get(itemKey)).pipe(
      map((serializedStr: string) => {

        if (serializedStr === null || serializedStr === undefined) {
          return null;
        }

        return JSON.parse(serializedStr);

      }));
  }

  serialize(value: any) {
    return JSON.stringify(value);
  }

  clear(key: string): Observable<any> {
    const itemKey = this.getItemKey(key);
    return fromPromise(this.storage.remove(itemKey));
  }

  protected getItemKey(key: string) {
    if (key == null) {
      throw Error('Attempted to save data with null key');
    }

    return this.nameSpace + '.' + key;
  }
}
