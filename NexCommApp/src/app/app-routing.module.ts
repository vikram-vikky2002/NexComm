import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component'; // Import ChatListComponent
import { ChatComponent } from './chat/chat.component'; // Import ChatComponent
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: 'chats', component: ChatListComponent }, // Route for Chat List
  { path: 'chats/:id', component: ChatComponent }, // Route for Individual Chat
  { path: 'login', component: LoginComponent },
  { path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
