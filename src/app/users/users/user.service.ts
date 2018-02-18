import { Injectable } from '@angular/core';
import { apiBaseUrl } from '../../app.shared';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class UserService {

  private apiBaseUrl: String = apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAll (data: any = {}) {
    return this.http.get(`${this.apiBaseUrl}/users`, {params: data});
  }

  add(data: User = {}) {
    return this.http.post(`${this.apiBaseUrl}/users`, data);
  }

  update(data: User = {}) {
    return this.http.put(`${this.apiBaseUrl}/users`, data);
  }

  delete(data: User = {}) {
    return this.http.delete(`${this.apiBaseUrl}/users?user_id=${data.user_id}&permanent=true`);
  }

}
