import { UserService } from './../../../services/user.service';
 
import { Country } from './../../../models/country.model';
import { User } from './../../../models/user.model';
import { Component, Input, Output,EventEmitter,  OnChanges ,OnInit} from '@angular/core'; 

import { DatePipe } from '@angular/common';
import { HttpModule }  from '@angular/http';

/**
 * 
 * 
 * @export
 * @class CountryStateSelector
 * @implements {OnInit}
 */
@Component({
  selector: 'countryStateSelector',
  templateUrl: './countryStateSelector.component.html'
})
export class CountryStateSelector implements OnInit{
  @Input() countryNameData:string
  @Input() stateNameData:string 
  @Output() stateSelected = new EventEmitter();
  users:User[] =[]
  countryName:string;
  stateName:string;
  countries:Country[] =[]
  country = new Country() 
  constructor(private countryStateSelectorService: UserService ){}

  /**
   * 
   * 
   * @memberof CountryStateSelector
   */
  ngOnInit(){ 
    this.getList(); 
  }

  /**
   * 
   * 
   * @memberof CountryStateSelector
   */
  getList(){ 
    this.countryStateSelectorService.getCountries().then((resp) =>{
      this.countries = resp;
      if(!this.countryNameData && !this.stateNameData){ 
       this.country = this.countries[0];
       this.countryName = this.country.id;
       this.stateName = this.country.states[0];
       this.onStateChange();
      }else{
       this.countryName = this.countryNameData;
        this.countryStateSelectorService.getCountry(this.countryName).then((resp)=>{
          this.country = resp;
          this.stateName =  this.stateNameData || '';
        });
      }  
    });
  } 

  /**
   * 
   * 
   * @memberof CountryStateSelector
   */
  onStateChange(){
    this.stateSelected.emit({
      country:  this.countryName,
      state: this.stateName
    });
 }

  /**
   * 
   * 
   * @memberof CountryStateSelector
   */
  onCountryChange(){
  this.countryStateSelectorService.getCountry(this.countryName).then((resp)=>{
      this.country = resp;
      this.countryName = resp.id;
      this.stateName = resp.states[0]; 
      this.onStateChange();
    });
  }
}
