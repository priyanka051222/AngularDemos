import { Component, Input, Output, OnInit} from '@angular/core'; 

import { DatePipe } from '@angular/common';
import { HttpModule }  from '@angular/http';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CountryState } from '../../models/countryState.model'
/**
 * 
 * 
 * @export
 * @class UsersComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit{
  users:User[] =[]; 
  addNewUser:boolean = false;
  showUpdateButton:boolean=false;
  newuser= new User();
  constructor(private userService: UserService,){}
  /**
   * 
   * 
   * @memberof UsersComponent
   */
  ngOnInit(){ 
    this.getUsersList();
    
  }

  /**
   * 
   * 
   * @memberof UsersComponent
   */
  getUsersList(){    
    this.userService.getUsers().then((resp) =>{
      this.users = resp;
    });
  } 

  /**
   * 
   * 
   * @memberof UsersComponent
   */
  showCreateUserForm(){
    this.addNewUser = true; 
  }
  /**
   * 
   * 
   * @memberof UsersComponent
   */ 
   createUser(){
    this.userService.create(this.newuser).then((resp) =>{
       this.getUsersList();
       this.newuser = new User();
       this.addNewUser = false;
    });
  }

  /**
   * 
   * 
   * @memberof UsersComponent
   */
  cancelCreateUser(){
    this.addNewUser = false;
  }
  
  trackByUsers(index: number, user: User): number { return user.id; }
  /**
   * 
   * 
   * @param {number} id 
   * @memberof UsersComponent
   */
  deleteUser(id:number){
    this.userService.delete(id).then((resp)=>{
        alert("User is deleted");
        this.getUsersList();
    });
  }

  /**
   * 
   * 
   * @param {CountryState} countryState 
   * @memberof UsersComponent
   * sets state and country for a new user to be created
   */
  onStateChange(countryState:CountryState){
      this.newuser.country = countryState.country;
      this.newuser.state = countryState.state;
  }
  
}
