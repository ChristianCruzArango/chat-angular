
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'login' , component:LoginComponent},
  {path:'chat'  , component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
