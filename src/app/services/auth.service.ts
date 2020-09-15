import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

const URL = environment.UrlBase;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  sendLogin(data){
    return this.http.post(`${URL}/api/auth/login`,data);
  }
}
