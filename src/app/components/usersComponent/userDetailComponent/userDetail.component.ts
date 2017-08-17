import { UserService } from './../../../services/user.service';
import { Component, Input, Output, EventEmitter,OnInit} from '@angular/core';  
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpModule }    from '@angular/http';  
import { User } from '../../../models/user.model'; 
import { CountryState } from '../../../models/countryState.model'
/**
 * 
 * 
 * @export
 * @class UserDetailComponent
 * @implements {OnInit}
 */
@Component({
  selector: '[userDetail]',
  templateUrl: './userDetail.component.html'
})

export class UserDetailComponent implements OnInit{
  @Input() dataUser:User;
  @Output() updateList = new EventEmitter();
  showUpdateButton: boolean = false;
  user = new User();
  constructor(private userService: UserService,
    private router:Router,
    private activatedRoute:ActivatedRoute){}
  /**
   * 
   * 
   * @memberof UsersComponent
   * Sets user data from user item component
   */
  ngOnInit(){
    this.user =this.activatedRoute.snapshot.data["user"];
  }
  /**
   * 
   * 
   * @memberof UserDetailComponent
   * Set the selected country and state
   * 
   */
  onStateChange(countryState:CountryState){
    this.user.country = countryState.country;
    this.user.state = countryState.state;
    console.log(countryState.state);
 }
 goBackToUserList(){
  this.router.navigateByUrl('/users');
}
  /**
   * 
   * 
   * @param {User} user 
   * @memberof UserDetailComponent
   * Submits updated user
   */
  submitUpdatedUser(user:User){
    this.userService.update(user).then((resp)=>{
      alert("User is updated");
      this.showUpdateButton = false;
      this.updateList.emit();
  });
  }  
}
