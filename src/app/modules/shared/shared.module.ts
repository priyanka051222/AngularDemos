import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryStateSelector } from './../../components/shared/countryStateSelectorComponent/countryStateSelector.component';

@NgModule({
  imports: [ CommonModule,FormsModule ],
  exports: [
    CommonModule,
    FormsModule,
    CountryStateSelector
  ],
  declarations: [CountryStateSelector],
})
export class SharedModule { }
