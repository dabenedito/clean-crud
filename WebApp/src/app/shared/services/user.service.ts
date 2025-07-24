import { inject, Injectable } from '@angular/core';
import { ApiResponse } from "../models/api-response";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

@Injectable()
export class UserService {
  private readonly baseUrl = 'http://localhost:5024/api';

  constructor(
    private readonly http: HttpClient,
  ) { }

  getAll(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/user`);
  }

  getById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/user/${id}`);
  }

  create(user: Partial<User>): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/user`, user);
  }

  update(user: Partial<User>): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.baseUrl}/user/${user.id}`, user);
  }

  delete(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/user/${id}`);
  }
}
