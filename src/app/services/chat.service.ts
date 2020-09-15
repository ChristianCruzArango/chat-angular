import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Echo from 'laravel-echo';
import { IMensaje } from '../Interfaces/Imensaje';

const URL = environment.UrlBase;

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private http:HttpClient) { }

  sendMensaje(mensaje:string,socketID){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'X-Socket-ID':socketID
    });

    const data = {
      mensaje
    }
    return this.http.post(`${URL}/api/mensaje/send`,data,{headers});
  }


  sendDirectoMensaje(mensaje:string,to:number ,socketID){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'X-Socket-ID':socketID
    });

    const data = {
      mensaje,
      to
    }

    return this.http.post(`${URL}/api/mensaje/sendUsuario`,data,{headers});}


  getSockets(){
    return  new Echo({
      broadcaster: 'pusher',
      key: 'AND20201234',
      wsHost: environment.pusher_host,
      cluster:environment.pusher_cluster,
      authEndpoint: `${environment.UrlBase}/api/broadcasting/auth`,
      auth:{
        headers:{
          Accept:'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      },
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      enabledTransports:['ws']
    });
  }


}
