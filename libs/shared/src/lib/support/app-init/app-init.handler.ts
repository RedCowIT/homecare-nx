import {Observable} from 'rxjs';

/**
 * Interface for handling Angular's APP_INITIALIZER tokens.
 *
 * An app init handler can hold the app up from booting in to the first component until the app has been determined initialized.
 *
 * Example: you may need to initialize an NgRx data store before components begin selecting data.
 */
export interface AppInitHandler {

    /**
     * Start initializing state here.
     *
     * Example: load data from local storage and dispatch an NgRx action to initialize your data store with it.
     */
    init(): void;

    /**
     * Create an Observable that only emits when you've determined the app has been successfully initialized.
     *
     * Example: select from NgRx store and filter for a value indicating complete initialisation.
     */
    waitUntilInitialized(): Observable<any>;

}
