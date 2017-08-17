import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable()
export class UserResolver implements Resolve<User | Observable<any>> {

    constructor(private userService: UserService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> | Observable<any> {
        let id = route.params['id'];
        // let id = route.paramMap.get('id');
        if (isNaN(+id)) {
            console.log(`User id was not a number: ${id}`);
            this.router.navigate(['/users']);
            return Observable.of(null);
        }
        return new Promise(resolve => {
            this.userService.getUser(+id).then(user => {
                if (user) {
                    resolve(user);
                } else {
                    console.log(`User was not found: ${id}`);
                    this.router.navigate(['/users']);
                    resolve(null);
                }

            }).catch(error => {
                            console.log(`Retrieval error: ${error}`);
                            this.router.navigate(['/users']);
                            resolve(null);
             });
        })
        //     return this.userService.getUser(+id).then(user => {
        //         if (user)
        //             return user;
        //         console.log(`User was not found: ${id}`);
        //         this.router.navigate(['/users']);
        //        // return Observable.of(null);
        //     })
        //     .catch(error => {
        //             console.log(`Retrieval error: ${error}`);
        //             this.router.navigate(['/users']);
        //             return Observable.of(null);
        //         });
    }
}
