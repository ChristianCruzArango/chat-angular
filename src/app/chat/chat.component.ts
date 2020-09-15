import { IMensaje } from './../Interfaces/Imensaje';
import { ChatService } from './../services/chat.service';
import { IUser } from '../Interfaces/IUser';
import { Component, OnInit } from '@angular/core';

import Echo from 'laravel-echo';

import { scrollTo } from 'scroll-js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  echo:Echo;
  mensaje:string;

  userList:IUser    [] = [];
  mensajes:IMensaje [] = [];

  auth:IUser = JSON.parse(localStorage.getItem('user'));

  constructor(private _serviceChat:ChatService) {
    this.echo = this._serviceChat.getSockets();
  }

  ngOnInit() {
    this.echo.private('channel-chat')
    .listen('ChatEvent',(res)=>{
      const msj:IMensaje = {
        mensaje:res.mensaje,
        me:false,
        from:res.from
      };
      this.mensajes.push(msj);
    });

    this.echo.join(`channel-chat`)
    .here((users) => {
      this.userList = users;
    })
    .joining((user) => {
      this.userList.push(user);
    })
    .leaving((user) => {
        this.userList = this.userList.filter((userL)=>{
          return user.id !== userL.id;
        });
    });
  }

  sendmensaje(){

    this._serviceChat.sendMensaje(this.mensaje,this.echo.socketId()).subscribe((resp:any)=>{
          const msj:IMensaje = {
            mensaje:this.mensaje,
            me:true,
            from: 'Yo'
          };
          this.mensaje = '';
          this.mensajes.push(msj);
          this.scrollBottom();
    });
  }

  scrollBottom(){
    const containerScroll = window.document.getElementById('scrollContainer');
    const newTop =containerScroll.scrollHeight;

    scrollTo(containerScroll,{top:newTop})
  }
}
