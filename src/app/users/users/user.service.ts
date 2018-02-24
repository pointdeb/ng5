import { Injectable } from '@angular/core';
import { apiBaseUrl } from '../../app.shared';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
declare var $: any;

@Injectable()
export class UserService {

  private apiBaseUrl: string = apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAll (data: any = {}) {
    return this.http.get(`${this.apiBaseUrl}/users`, {params: data});
  }

  add(data: User = {}) {

    return this.http.post(`${this.apiBaseUrl}/users`,
      $.param(data),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }

  update(data: User = {}) {
    data._method = 'PUT';
    return this.http.post(`${this.apiBaseUrl}/users/${data.id}`,
      $.param(data),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  }

  delete(data: User = {}) {
    data._method = 'DELETE';
    return this.http.post(`${this.apiBaseUrl}/users/${data.id}`, $.param(data),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  }

}
