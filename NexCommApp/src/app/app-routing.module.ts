import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { FooterComponent } from './Components/footer/footer.component';
import { FeaturesComponent } from './Components/features/features.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { HelpCenterComponent } from './Components/help-center/help-center.component';
import { ChatListComponent } from './Components/chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component'; // Import ChatComponent
import { LoginComponent } from './Components/login/login.component';
import { TermsComponent } from './Components/terms/terms.component';
import { UsersComponent } from './Components/users/users.component';
import { NetworkErrorComponent } from './network-error/network-error.component';
import { PathErrorComponent } from './path-error/path-error.component';
import { NewChatComponent } from './Components/new-chat/new-chat.component'; // Import NewChatComponent
import { forgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { ViewFilesComponent } from './Components/view-files/view-files.component';
import { NewPasswordComponent } from './Components/newpassword/newpassword.component';
import { PrivacyPolicyComponent } from './Components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'chats', component: ChatListComponent, canActivate: [AuthGuard] },
  { path: 'chat/:chatTitle/:roomId', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'chat/new', component: NewChatComponent, canActivate: [AuthGuard] },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'helpCenter', component: HelpCenterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'network-error', component: NetworkErrorComponent },
  { path: 'path-error', component: PathErrorComponent },
  { path: 'users', component: UsersComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'forgotpassword', component: forgotpwdComponent },
  { path: 'view-files/:roomId',component: ViewFilesComponent },
  { path: 'newpassword', component: NewPasswordComponent },
  { path: '**', redirectTo: '/path-error' }
]

@NgModule({  
 imports: [RouterModule.forRoot(routes), FormsModule],  
 exports: [RouterModule]  
})

export class AppRoutingModule { }
