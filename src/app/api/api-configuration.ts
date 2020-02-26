/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '//35.209.250.234:7070';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
