
import { SharedModule} from './shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from './shared/dropdown.module';
import { RouterModule } from '@angular/router';
// Import Components 
import { UsersComponent } from './../components/usersComponent/users.component';
import { UserItemComponent } from './../components/usersComponent/userItemComponent/userItem.component';
import { UserDetailComponent } from './../components/usersComponent/userDetailComponent/userDetail.component';
import { UserEditComponent } from './../components/usersComponent/userEditComponent/userEdit.component';
// Import Services
import { UserService }         from '../services/user.service';
import { UserResolver } from '../services/user-resolver.service';

 
/**
 * 
 * 
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    UsersComponent,
    UserItemComponent,
    UserDetailComponent,
    UserEditComponent
  ],
  imports:[    
      FormsModule,SharedModule,MultiselectDropdownModule,
      RouterModule.forChild([
        { path: 'users', component: UsersComponent }, 
        { path: 'users/:id', component: UserDetailComponent ,
          resolve: { user: UserResolver },},
        { path: 'users/:id/edit', component: UserEditComponent, 
        resolve: { user: UserResolver },
      }
      ])
  ],
  providers: [UserService,UserResolver],
})
export class UsersModule { 
}
