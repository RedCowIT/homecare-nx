import {InjectionToken} from '@angular/core';
import {Auth0Config} from '../models';

export const AUTH0_CONFIG = new InjectionToken<Auth0Config>('auth0.config');
export const AUTH0_DOMAINS = new InjectionToken<string[]>('auth0.domains');
