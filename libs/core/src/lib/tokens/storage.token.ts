import {InjectionToken} from '@angular/core';
import {ClientStorage} from '../services/storage/client-storage';

export const CLIENT_STORAGE = new InjectionToken<ClientStorage>('core.clientStorage');

