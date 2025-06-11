import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturesComponent } from './components/features/features.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { ChatListComponent } from './components/chat-list/chat-list.component'; // Import ChatListComponent

const routes: Routes = [
  { path: '', redirectTo: 'footer', pathMatch: 'full' },
  { path: 'chats', component: ChatListComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'helpCenter', component:HelpCenterComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
