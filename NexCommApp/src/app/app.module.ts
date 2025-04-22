import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router'; // Import RouterModule
import { ChatListComponent } from './chat-list/chat-list.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FeaturesComponent } from './features/features.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpCenterComponent } from './help-center/help-center.component'; // Import ChatListComponent
import { FormsModule } from '@angular/forms';
import { UserNavBarComponent } from './components/user-nav-bar/user-nav-bar.component';
import { LoaderComponentComponent } from './components/loader-component/loader-component.component';
import { AdminNavBarComponent } from './components/admin-nav-bar/admin-nav-bar.component'; // Import ChatListComponent


@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    FooterComponent,
    ContactUsComponent,
    FeaturesComponent,
    AboutUsComponent,
    HelpCenterComponent, // Declare ChatListComponent
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
