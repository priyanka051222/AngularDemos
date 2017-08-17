import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    errorMessage: string;
    pageTitle = 'Log In';

    constructor(private authService: AuthService,private router:Router) { }

    login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            let userName = loginForm.form.value.userName;
            let password = loginForm.form.value.password;
            this.authService.login(userName, password);

            // Navigate to the Product List page after log in.

    this.router.navigate(['/users']);
        } else {
            this.errorMessage = 'Please enter a user name and password.';
        };
    }
}
