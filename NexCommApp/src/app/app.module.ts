import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NewChatComponent } from './Components/new-chat/new-chat.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { FeaturesComponent } from './Components/features/features.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { HelpCenterComponent } from './Components/help-center/help-center.component'; // Import ChatListComponent
import { UserNavBarComponent } from './Components/user-nav-bar/user-nav-bar.component';
import { LoaderComponentComponent } from './Components/loader-component/loader-component.component';
import { AdminNavBarComponent } from './Components/admin-nav-bar/admin-nav-bar.component'; // Import ChatListComponent
import { UsersComponent } from './Components/users/users.component'; // Import ChatComponent
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ChatListComponent } from './Components/chat-list/chat-list.component'; // Import ChatListComponent
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './Components/login/login.component'; // Import ChatComponent
import { FormsModule } from '@angular/forms';
import { TermsComponent } from './Components/terms/terms.component';
import { NetworkErrorComponent } from './network-error/network-error.component';
import { PathErrorComponent } from './path-error/path-error.component';
import { forgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { LandingHeaderComponent } from './Components/landing-header/landing-header.component';
import { ViewFilesComponent } from './Components/view-files/view-files.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ContactUsComponent,
    FeaturesComponent,
    AboutUsComponent,
    HelpCenterComponent,
    UserNavBarComponent,
    LoaderComponentComponent,
    AdminNavBarComponent,
    ChatComponent, // Declare ChatComponent
    NewChatComponent,
    LandingPageComponent, // ✅ ADD THIS
    UsersComponent,
    ChatListComponent, // Declare ChatListComponent
    ChatComponent, LoginComponent, TermsComponent, NetworkErrorComponent, PathErrorComponent, forgotpwdComponent, LandingHeaderComponent, ViewFilesComponent // Declare ChatComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Add RouterModule to imports
    HttpClientModule, // Add HttpClientModule to imports
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
