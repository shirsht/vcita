import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Business} from '../../Model/Business';
import { DialogService } from 'src/app/Common/Dialog/DialogService.service';
import { isNullOrUndefined } from 'util';

@Injectable({ providedIn: 'root' })
export class BusinessAPIService {

  private url = 'https://api2.meet2know.com/operator_api/v1/businesses/';  // URL to web api
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDM4Njk5MDMsIm9wZXJhdG9yX3VpZCI6IndnajBlbjJnZXhkNTFjbmsiLCJpbXBlcnNvbmF0ZV9vcGVyYXRvcl91aWQiOm51bGwsImp0aSI6IjYyMDJlYjIxNDhlMjRiZTkyMjBmZjg3OGJlNTJkNmZjOWEwNTY0NzZlNTEwYTMxM2VjYzBmMjcyZWYxOTJlYTUifQ.kdAo53TJdQrA8pgpWrcG2fvko7rV3G-NGFBuzeBhuc8';
  private headers = new HttpHeaders().set('Authorization', this.token);


  constructor(private http: HttpClient, private dialogService: DialogService) { }

  getBusinesses(pageNum, itemsPerPage, sortBy, sortOrder, searchText): Observable<any> {
    let params = new HttpParams()
    .set('page', pageNum)
    .set('per_page', itemsPerPage)
    .set('sort_by', sortBy)
    .set('sort_order', sortOrder);
    if (searchText !== null && searchText.length > 0){
      params = params.append('filters[search]', searchText);
    }
    return this.http.get<any>(this.url + 'get_businesses', {headers: this.headers, params}).pipe(
        catchError(this.handleError<string[]>('getBusinesses', null))
      );
  }
  createBusiness(business: Business): Observable<any> {
    const params = { 'business':
    {
      'business_name': business.name,
      'email': business.email,
      'password': business.password,
      'country_name': business.country,
      'phone_info': business.phone,
      'meeting_location': business.address

    }
  }
    return this.http.post<any>(this.url + 'create_business', params, {headers: this.headers}).pipe(
        catchError(this.handleError<string[]>('createBusinesses', []))
      );
  }
  removeBusinesses(businessUID: string): Observable<any> {
    const params = { 'business_uids': [businessUID] };
    return this.http.post<any>(this.url + 'remove_businesses', params, {headers: this.headers}).pipe(
        catchError(this.handleError<string[]>('removeBusinesses', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed');
      console.error(error);
      this.dialogService.openDialog(this.getErrorMessage(error.error));
      return of(result as T);
    };
  }
  private getErrorMessage(error): string {
    if (isNullOrUndefined(error.data) === true) {
      if (isNullOrUndefined(error.message) === true) {
        return 'Something went wrong';
      }
    }
    else {
      return Object.values(error.data)[0].toString();
    }
  }
}

