import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component'; // Import ChatListComponent

const routes: Routes = [
  { path: 'chats', component: ChatListComponent }, // Route for Chat List
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
