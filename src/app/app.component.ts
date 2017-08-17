import { MessageService } from './components/messages/message.service';
import { AuthService } from './components/login/auth.service';
import { Component, Output } from '@angular/core';
import { Router } from '@angular/router'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

/**
 * 
 * 
 * @export
 * @class AppComponent
 * Initialize title of application and current component
 * 
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private title = 'Netent Player Account Management';
  constructor(private router:Router,
    private authService:AuthService, 
    private messageService: MessageService){}
  logIn(){
    this.router.navigate(['/login']);
  }
  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }

  displayMessages(): void {
    // Example of primary and secondary routing together
    // this.router.navigate(['/login', {outlets: { popup: ['messages']}}]); // Does not work
    // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
    this.router.navigate([{outlets: { popup: ['messages']}}]); // Works
    this.messageService.isDisplayed = true;
}

hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
}
}
