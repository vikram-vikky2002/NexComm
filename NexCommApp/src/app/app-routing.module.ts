import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { FooterComponent } from './Components/footer/footer.component';
import { FeaturesComponent } from './Components/features/features.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { HelpCenterComponent } from './Components/help-center/help-center.component';
import { ChatListComponent } from './Components/chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component'; // Import ChatComponent
import { LoginComponent } from './Components/login/login.component';
import { TermsComponent } from './Components/terms/terms.component';
import { NewChatComponent } from './Components/new-chat/new-chat.component'; // Import NewChatComponent
import { UsersComponent } from './Components/users/users.component'; // Import ChatComponent

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'chats', component: ChatListComponent },
  { path: 'chat/:chatTitle/:roomId', component: ChatComponent },
  { path: 'chat/new', component: NewChatComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'helpCenter', component: HelpCenterComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'users', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'terms', component: TermsComponent }

  s
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
