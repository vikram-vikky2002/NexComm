import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturesComponent } from './components/features/features.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component'; // Import ChatComponent
import { LoginComponent } from './Components/login/login.component';
import { TermsComponent } from './Components/terms/terms.component';
import { NewChatComponent } from './components/new-chat/new-chat.component'; // Import NewChatComponent

const routes: Routes = [
  { path: '', redirectTo: '/chats', pathMatch: 'full' },
  { path: 'chats', component: ChatListComponent },
  { path: 'chat/:chatTitle/:roomId', component: ChatComponent },
  { path: 'chat/new', component: NewChatComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'helpCenter', component: HelpCenterComponent },
  { path: '**', component: ChatListComponent }
  { path: 'chats', component: ChatListComponent }, // Route for Chat List
  { path: 'chats/:id', component: ChatComponent }, // Route for Individual Chat
  { path: 'login', component: LoginComponent },
  {path:'terms', component:TermsComponent},
  { path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
