import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, Input, Output, EventEmitter,OnInit} from '@angular/core';  
import { DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http'; 
import { User } from '../../../models/user.model'; 
import { Country } from '../../../models/country.model'; 
/**
 * 
 * 
 * @export
 * @class UserItemComponent
 * @implements {OnInit}
 */
@Component({
  selector: '[userItem]',
  styleUrls:['./userItem.component.css'],
  templateUrl: './userItem.component.html'
})

export class UserItemComponent implements OnInit{
  @Input() dataUser:User;
  @Input() countries:Country[];
  @Output() updateList = new EventEmitter();
  showUpdateButton:boolean=false; 
  showDetailSection: boolean = false;
  user= new User();
  constructor(private userService: UserService,private router:Router){}
  /**
   * 
   * 
   * @memberof UsersComponent
   */
  ngOnInit(){
      this.user = this.dataUser;
  }

  /**
   * 
   * 
   * @param {number} id 
   * @memberof UserItemComponent
   * Deletes a user
   */
  deleteUser(id:number){
    this.userService.delete(id).then((resp)=>{
        alert("User is deleted");
        this.updateList.emit();
    });
  }
  editUser(userId:string){
    this.router.navigate(['/users',userId,'edit']);
  }

  /**
   * 
   * 
   * @param {User} user 
   * @returns 
   * @memberof UserItemComponent
   * Send a shallow copy to user item component
   */
  getUser(user:User){
   return Object.assign({},user);
  }
}
