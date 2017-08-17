 
import { RacerComponent } from './../components/racerComponent/racer.component';

import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Import Components 

import { UsersComponent } from '../components/usersComponent/users.component';
import { UserItemComponent } from '../components/usersComponent/userItemComponent/userItem.component'; 
import { UserDetailComponent } from '../components/usersComponent/userDetailComponent/userDetail.component';
// Import Services
import { UserService }         from '../services/user.service';

// Import Directives
import { HighlightDirective } from '../directives/highlight.directive';


/**
 * 
 * 
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    RacerComponent,
    HighlightDirective
  ],
  imports: [
      FormsModule,SharedModule,
      RouterModule.forChild([
        { path: 'users', component: UsersComponent }
      ])
  ],
  exports:[
    HighlightDirective
  ],
  providers: [UserService],
})
export class RacersModule { 
}
