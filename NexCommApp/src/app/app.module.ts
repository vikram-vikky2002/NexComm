import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ChatListComponent } from './chat-list/chat-list.component'; // Import ChatListComponent
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './Components/login/login.component'; // Import ChatComponent
import { FormsModule } from '@angular/forms';
import { TermsComponent } from './Components/terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent, // Declare ChatListComponent
    ChatComponent, LoginComponent, TermsComponent // Declare ChatComponent
    
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
