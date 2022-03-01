import { ProjectIds } from './../models/project-ids.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'any' })
export class UserService {
  baseUrl: string = 'https://5c3ce12c29429300143fe570.mockapi.io/api';
  constructor(private http: HttpClient) {}

  getRegisteredUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/registeredusers`);
  }

  getUnregisteredUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/unregisteredusers`);
  }

  getProjectMemberships() {
    return this.http.get<ProjectIds[]>(`${this.baseUrl}/projectmemberships`);
  }
}
