import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectSearchFilter } from './../../components/dropdown/search-filter.pipe';
import { MultiselectDropdown } from './../../components/dropdown/dropdown.component';
  
@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [MultiselectDropdown, MultiSelectSearchFilter],
  declarations: [MultiselectDropdown, MultiSelectSearchFilter],
})
export class MultiselectDropdownModule { }
