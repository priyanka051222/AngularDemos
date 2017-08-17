import { IMultiSelectOption, IMultiSelectSettings } from './../../dropdown/types';
import { UserService } from './../../../services/user.service';
import { Component, Input, Output, EventEmitter,OnInit} from '@angular/core'; 
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpModule }    from '@angular/http';  
import { User } from '../../../models/user.model'; 
import { CountryState } from '../../../models/countryState.model'

/**
 * 
 * 
 * @export
 * @class UserEditComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './userEdit.component.html',
  styleUrls:['./userEdit.component.css']
})

export class UserEditComponent implements OnInit{
  @Input() dataUser:User;
  @Output() updateList = new EventEmitter();
  showUpdateButton: boolean = false;
  user = new User();
  constructor(private userService: UserService,
    private router :Router,
     private activatedRoute:ActivatedRoute){}
     optionsModel: number[];
     myGames: IMultiSelectOption[];
     settingsMultiselect:IMultiSelectSettings;
     onChange() {
         console.log(this.optionsModel);
     }
  /**
   * 
   * 
   * @memberof UsersComponent
   * Sets user data from user item component
   */
  ngOnInit(){
    this.settingsMultiselect = {
      // showUncheckAll:true,
      // showCheckAll:true,
      checkedStyle:'checkboxes',
      enableSearch: true, 
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true
  };
  
   // this.user =this.activatedRoute.snapshot.data["user"];
   this.myGames = [
        { id: 1, name: 'Minesweeper' },
        { id: 2, name: 'Daisy' },
        { id: 3, name: 'Casino' },
        { id: 4, name: 'Ball Pin' },
        { id: 5, name: 'Roseland' },
        { id: 6, name: 'DraculaWheels' },
    ];
    this.activatedRoute.data.subscribe(data => {
      this.user = data['user']; 
     });
    // this.activatedRoute.params.subscribe(params =>{
    //   this.user.id = params.id;
    // });
    // this.userService.getUser(this.user.id).then((resp)=>{
    //   this.user = resp;
    // });
  }
  /**
   * 
   * 
   * @memberof UserEditComponent
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
   * @memberof UserEditComponent
   * Submits updated user
   */
  submitUpdatedUser(user:User){
    this.userService.update(user).then((resp)=>{
      alert("User is updated");
      this.showUpdateButton = false;
      this.goBackToUserList();
  });
  }  
}
