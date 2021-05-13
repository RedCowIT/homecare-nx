import {Injectable} from "@angular/core";
import {ClientStorage} from "./client-storage";

/**
 * Wraps browser localStorage to work with vanilla Js.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements ClientStorage {
    isSupported: boolean;

    constructor() {

        this.isSupported = typeof window.localStorage !== 'undefined' && window.localStorage != null;

    }

    /**
     * Get the value associated with the given key.
     * @param key the key to identify this value
     * @return Promise that resolves with the value
     */
    get(key: string): Promise<any> {
        this.assertSupport();

        return new Promise<any>((resolve, reject) => {

            if (key == null) {
                return reject('Null key');
            }

            return resolve(localStorage.getItem(key));
        });
    }

    /**
     * Set the value for the given key.
     * @param key the key to identify this value
     * @param value the value for this key
     * @return Promise that resolves when the value is set
     */
    set(key: string, value: any): Promise<any> {
        this.assertSupport();

        return new Promise<any>((resolve, reject) => {

            if (key == null) {
                return reject('Null key');
            }

            return resolve(localStorage.setItem(key, value));

        });
    }


    /**
     * Remove any value associated with this key.
     * @param key the key to identify this value
     * @return Promise that resolves when the value is removed
     */
    remove(key: string): Promise<any> {
        this.assertSupport();

        return new Promise<any>((resolve, reject) => {

            if (key == null) {
                return reject('Null key');
            }

            return resolve(localStorage.removeItem(key));

        });
    }


    /**
     * Clear the entire key value store. WARNING: HOT!
     * @return Promise that resolves when the store is cleared
     */
    clear(): Promise<void> {
        this.assertSupport();

        return new Promise<any>((resolve, reject) => {

            return resolve(localStorage.clear());

        });
    }


    /**
     * @return Promise that resolves with the number of keys stored.
     */
    length(): Promise<number> {
        this.assertSupport();

        return new Promise<any>((resolve, reject) => {

            return resolve(localStorage.length);

        });
    }



    /**
     * @return Promise that resolves with the keys in the store.
     */
    keys(): Promise<string[]> {
        this.assertSupport();

        return new Promise<any>((resolve, reject) => {

            const keys = Object.keys(localStorage).reduce((obj, str) => {
                obj[str] = localStorage.getItem(str);
                return obj;
            }, {});

            return resolve(keys);

        });
    }


    /**
     * Throws error if LocalStorage is not supported
     */
    private assertSupport() {
        if (!this.isSupported) {
            throw new Error('LocalStorage unsupported');
        }
    }
}
