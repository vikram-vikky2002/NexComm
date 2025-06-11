import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component'; // Import ChatComponent
import { NewChatComponent } from './components/new-chat/new-chat.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router'; // Import RouterModule
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FeaturesComponent } from './components/features/features.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpCenterComponent } from './components/help-center/help-center.component'; // Import ChatListComponent
import { UserNavBarComponent } from './components/user-nav-bar/user-nav-bar.component';
import { LoaderComponentComponent } from './components/loader-component/loader-component.component';
import { AdminNavBarComponent } from './components/admin-nav-bar/admin-nav-bar.component'; // Import ChatListComponent

import { RouterModule } from '@angular/router'; // Import RouterModule
import { ChatListComponent } from './chat-list/chat-list.component'; // Import ChatListComponent
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './Components/login/login.component'; // Import ChatComponent
import { FormsModule } from '@angular/forms';
import { TermsComponent } from './Components/terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    FooterComponent,
    ContactUsComponent,
    FeaturesComponent,
    AboutUsComponent,
    HelpCenterComponent,
    UserNavBarComponent,
    LoaderComponentComponent,
    AdminNavBarComponent,
    ChatComponent, // Declare ChatComponent
    NewChatComponent
    ChatListComponent, // Declare ChatListComponent
    ChatComponent, LoginComponent, TermsComponent // Declare ChatComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Add RouterModule to imports
    HttpClientModule, // Add HttpClientModule to imports
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
