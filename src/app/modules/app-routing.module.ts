import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router'; 
import { WelcomeComponent } from '../components/welcomeComponent/welcome.component';
import { RacerComponent } from '../components/racerComponent/racer.component';
import {PageNotFoundComponent} from '../components/pageNotFound/pageNotFound.component';

const appRoutes: Routes = [ 
  { path: 'home', component: WelcomeComponent },
  { path: 'racers',        component: RacerComponent },
  { path: 'welcome',   redirectTo: '/home', pathMatch: 'full' },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}