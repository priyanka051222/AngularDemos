
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }     from './services/inMemoryApi'; 

import { AppRoutingModule } from './modules/app-routing.module';  
import { LoginModule } from './modules/login.module';
import { UsersModule } from './modules/users.module';
import { RacersModule } from './modules/racers.module';
import { MessageModule } from './modules/message.module';
// Import Components 
import { WelcomeComponent } from './components/welcomeComponent/welcome.component';
import { AppComponent } from './app.component';  
import {PageNotFoundComponent} from './components/pageNotFound/pageNotFound.component';
// Import Services
import { UserService }         from './services/user.service';


/**
 * 
 * 
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    WelcomeComponent,
    AppComponent,
    PageNotFoundComponent    
  ],
  imports: [
    BrowserModule, FormsModule,HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),LoginModule,
    UsersModule,RacersModule,MessageModule,AppRoutingModule
  ],
  providers: [InMemoryDataService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
