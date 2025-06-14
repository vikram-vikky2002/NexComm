import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ChatListComponent } from './chat-list/chat-list.component'; // Import ChatListComponent
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component'; // Import ChatComponent

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent, // Declare ChatListComponent
    ChatComponent, UsersComponent // Declare ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Add RouterModule to imports
    HttpClientModule // Add HttpClientModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }