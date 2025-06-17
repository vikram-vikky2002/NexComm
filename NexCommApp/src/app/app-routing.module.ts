import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturesComponent } from './components/features/features.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component'; // Import ChatComponent
import { LoginComponent } from './components/login/login.component';
import { TermsComponent } from './components/terms/terms.component';
import { NewChatComponent } from './components/new-chat/new-chat.component'; // Import NewChatComponent
import { forgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { FormsModule } from '@angular/forms';


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
  { path: 'terms', component: TermsComponent },
  { path: 'forgotpassword', component: forgotpwdComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({  
 imports: [RouterModule.forRoot(routes), FormsModule],  
 exports: [RouterModule]  
})

export class AppRoutingModule { }
