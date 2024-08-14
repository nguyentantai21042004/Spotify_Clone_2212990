import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { SignuppageComponent } from './pages/signuppage/signuppage.component';
import { SongsectionComponent } from './components/songsection/songsection.component';
import { SidebarsectionComponent } from './components/sidebarsection/sidebarsection.component';
import { HehComponent } from './pages/heh/heh.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginpageComponent,
    SignuppageComponent,
    SongsectionComponent,
    SidebarsectionComponent,
    HehComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [HomepageComponent]
})
export class AppModule { }
