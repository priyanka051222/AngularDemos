import { UserService } from './../../services/user.service';
import { Component, Input, Output, OnInit} from '@angular/core'; 

import { DatePipe } from '@angular/common';
import { HttpModule }  from '@angular/http'; 
import { Colors } from '../../models/colors.constants'; 
import { Color } from '../../models/color.model'
import { User } from '../../models/user.model' 
import { CountryState } from '../../models/countryState.model'
/**
 * 
 * 
 * @export
 * @class RacerComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'racers',
  templateUrl: './racer.component.html',
  styleUrls: ['./racer.component.css']
})
export class RacerComponent implements OnInit{
  users:User[] =[]
  color:string
  highlightColors:Color[]

  /**
   * Creates an instance of RacerComponent.
   * @param {UserService} userService 
   * @memberof RacerComponent
   */
  constructor(private userService: UserService){}

  /**
   * 
   * 
   * @memberof RacerComponent
   * Sets the highlight color list
   */
  ngOnInit(){ 
    this.highlightColors = Colors.COLORS;
    this.color = this.highlightColors[0].value;
  }

 /**
  * 
  * @param {any} countryState 
  * @memberof RacerComponent
  * Gets Country name and its list of states
  */
 onStateChange(countryState:CountryState){
  this.userService.getUsersByCountryAndState(countryState.country,countryState.state).then((resp:User[]) =>{
    this.users = resp;    
  });
 }
}
