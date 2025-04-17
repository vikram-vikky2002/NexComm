import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component'; // Import ChatListComponent
import { ChatComponent } from './chat/chat.component'; // Import ChatComponent

const routes: Routes = [
  { path: 'chats', component: ChatListComponent }, // Route for Chat List
  { path: 'chats/:id', component: ChatComponent } // Route for Individual Chat
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
