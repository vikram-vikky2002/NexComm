import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ChatListComponent } from './chat-list/chat-list.component'; // Import ChatListComponent
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { GroupchatComponent } from './components/group-chat/group-chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { UserNavBarComponent } from './components/user-nav-bar/user-nav-bar.component';
import { LoaderComponentComponent } from './components/loader-component/loader-component.component';
import { AdminNavBarComponent } from './components/admin-nav-bar/admin-nav-bar.component'; // Import ChatListComponent

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent, // Declare ChatListComponent
    ChatComponent,
    GroupchatComponent // Declare ChatComponent
    ChatListComponent,
    UserNavBarComponent,
    LoaderComponentComponent,
    AdminNavBarComponent, // Declare ChatListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Add RouterModule to imports
    HttpClientModule, // Add HttpClientModule to imports
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
