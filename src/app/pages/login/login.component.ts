import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario:FormGroup;

  constructor(private _authService:AuthService,private route:Router) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      email:new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    });
  }

  login(){
    this._authService.sendLogin(this.formulario.value).subscribe((resp:any)=>{
      localStorage.setItem('token',resp.token);
      localStorage.setItem('user',JSON.stringify(resp.user));
      this.route.navigate(['chat']);
    });
  }

}
