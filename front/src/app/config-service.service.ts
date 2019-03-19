import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ConfigServiceService {

  private apiUrl = 'http://trigvent.com/portfolio/clerk/api/public/api';
  private baseUrl = 'http://trigvent.com/portfolio/clerk/api/public';

  constructor() {
    if (window.location.host.startsWith('localhost')) {
      this.apiUrl = 'http://localhost:8000/api';
      this.baseUrl = 'http://localhost:8000';
    }
  }

  getApiUrl() {
    return this.apiUrl;
  }  
  
  getBaseUrl() {
    return this.baseUrl;
  }

}
