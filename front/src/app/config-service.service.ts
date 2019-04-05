import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ConfigServiceService {

/*   private apiUrl = 'http://trigvent.com/portfolio/asmile/api/public/api';
  private baseUrl = 'http://trigvent.com/portfolio/asmile/api/public'; */

  private apiUrl = 'https://www.eliteexpert.net/asmile/api/public/index.php/api';
  private baseUrl = 'https://www.eliteexpert.net/asmile/api/public';
  
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
