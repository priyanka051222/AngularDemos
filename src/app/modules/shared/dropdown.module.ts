import { MultiSelectSearchFilter } from './../../components/dropdown/search-filter.pipe';
import { MultiselectDropdown } from './../../components/dropdown/dropdown.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MultiselectDropdown, MultiSelectSearchFilter],
  declarations: [MultiselectDropdown, MultiSelectSearchFilter],
})
export class MultiselectDropdownModule { }
