import { Component, Input, OnInit } from '@angular/core';
import { IUser } from './../../../Interfaces/IUser';
import { ChatService } from './../../../services/chat.service';
import Echo from 'laravel-echo';
import { ToastrService } from 'ngx-toastr';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() userList:IUser [] = [];

  textMensaje:string;

  showModal:boolean = false;
  UsuarioMensaje:IUser;
  echo:Echo;

  auth:IUser = JSON.parse(localStorage.getItem('user'));

  constructor(private _serviceChat:ChatService,private toastr: ToastrService) {
      this.echo = _serviceChat.getSockets();
   }

  ngOnInit() {
    this.getDirectMensaje();
  }

  AbrirModal(user:IUser){
    if(user.id === this.auth.id){
      return;
    }
    this.showModal = true;
    this.UsuarioMensaje = user;
  }

  cerrarModal(){
    this.showModal = false;
  }

  enviarMensaje(){

  const socketsId = this.echo.socketId();

   this._serviceChat.sendDirectoMensaje(this.textMensaje,this.UsuarioMensaje.id,socketsId).subscribe((resp:any)=>{
    console.log(resp);
   });
    this.cerrarModal();
    this.textMensaje = '';
  }

  getDirectMensaje(){
        this.echo.private(`channel-directo.${this.auth.id}`).listen('DirectMensajeEvent',((resp:any)=>{
      this.toastr.success(resp.response.mensaje,`Mensaje de: ${resp.response.from.name}`,{
        timeOut:1000,
        positionClass:'toast-top-center'
      });
    }));
  }

}
