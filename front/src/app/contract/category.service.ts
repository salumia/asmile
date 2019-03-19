import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigServiceService } from '../config-service.service';
import { Category } from './category';
import { CategoryChangeResponse } from './category-change-response';

@Injectable()
export class CategoryService {

  readonly apiUrl;

  constructor(private http: HttpClient, private auth: AuthService, config: ConfigServiceService) {
    this.apiUrl = config.getApiUrl();
  }
  
  getIndustryCategoryList(user:number) {
	  const token = this.auth.getToken();
	return this.http.get<any>(this.apiUrl + '/category-list/'+user,{
	  headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  getCategoryList() {
	const token = this.auth.getToken();
	return this.http.get<any>(this.apiUrl + '/category-list',{
	  headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 

  getCategories() {
    const token = this.auth.getToken();
    return this.http.get<Category[]>(this.apiUrl + '/category', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  getCategory(id: number) {
    const token = this.auth.getToken();
    return this.http.get<Category>(this.apiUrl + '/category/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).map(res => {
      return new Category(res);
    });
  } 
   saveCategory(id: number, data: Category) {
    const token = this.auth.getToken();
	if(id > 0 ){
		return this.http.put<CategoryChangeResponse>(this.apiUrl + '/category/' + id, data, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} else {
		return this.http.post<CategoryChangeResponse>(this.apiUrl + '/category', data, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
  }
  
  deleteCategory(id: number) {
    const token = this.auth.getToken();
    return this.http.delete<CategoryChangeResponse>(this.apiUrl + '/category/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
  disableCategory(id: number) {
    const token = this.auth.getToken();
    return this.http.post<CategoryChangeResponse>(this.apiUrl + '/category/disable-category/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  enableCategory(id: number) {
    const token = this.auth.getToken();
    return this.http.post<CategoryChangeResponse>(this.apiUrl + '/category/enable-category/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 
  
}