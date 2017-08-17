import { RouterModule } from '@angular/router';
import { AuthService } from '../components/login/auth.service';
import { LoginComponent } from '../components/login/login.component';
import { NgModule } from '@angular/core'; 
import { MessageService } from '../components/messages/message.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    MessageService
  ]
})
export class LoginModule { }
