import {first} from 'rxjs/operators';
import {AppInitHandler} from './app-init.handler';

/**
 * Creates App Initializer functions for Angular's APP_INITIALIZER token
 *
 * Assign several handlers to a single token using provider flag "multi: true".
 *
 * @example
 * app.module.ts
 *  providers: [
 *      ...,
 *      CustomInitHandler,
 *      {provide: APP_INITIALIZER, useFactory: myAppInitializer, deps: [CustomInitHandler], multi: true},
 *  ]
 *  export function myAppInitializer(appInitHandler: AppInitHandler): () => void {
 *      return AppInitFactory.create(appInitHandler);
 *  }
 */
export class AppInitFactory {

    /**
     * Create APP_INITIALIZER function for a given handler
     *
     * TODO: Add a configurable timeout and then error
     *
     * @param handler Custom app setup logic
     */
    public static create(handler: AppInitHandler): () => void {

        return () => {
            const promise = new Promise<void>((resolve, reject) =>
                handler.waitUntilInitialized()
                    .pipe(
                        first()
                    ).subscribe(
                    () => resolve(),
                    (error) => {
                        reject(error);
                    }));

            handler.init();

            return promise;
        };
    }
}
