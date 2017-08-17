import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeUntil';

import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  IterableDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { MultiSelectSearchFilter } from './search-filter.pipe';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from './types';

/*
 * Angular 2 Dropdown Multiselect for Bootstrap
 *
 * Simon Lindh
 * https://github.com/softsimon/angular-2-dropdown-multiselect
 */

const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiselectDropdown),
  multi: true
};

@Component({
  selector: 'ss-multiselect-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [MULTISELECT_VALUE_ACCESSOR, MultiSelectSearchFilter]
})
export class MultiselectDropdown implements OnInit, OnChanges, DoCheck, OnDestroy, ControlValueAccessor, Validator {

  filterControl: FormControl = this.fb.control('');

  @Input() options: Array<IMultiSelectOption>;
  @Input() settings: IMultiSelectSettings;
  @Input() texts: IMultiSelectTexts;
  @Input() disabled: boolean = false;
  @Input() disabledSelection: boolean = false;
  @Output() selectionLimitReached = new EventEmitter();
  @Output() dropdownClosed = new EventEmitter();
  @Output() dropdownOpened = new EventEmitter();
  @Output() onAdded = new EventEmitter();
  @Output() onRemoved = new EventEmitter();
  @Output() onLazyLoad = new EventEmitter();
  @Output() onFilter: Observable<string> = this.filterControl.valueChanges;

  @HostListener('document: click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (!this.isVisible || !this.settings.closeOnClickOutside) return;
    let parentFound = false;
    while (target != null && !parentFound) {
      if (target === this.element.nativeElement) {
        parentFound = true;
      }
      target = target.parentElement;
    }
    if (!parentFound) {
      this.isVisible = false;
      this.dropdownClosed.emit();
    }
  }

  destroyed$ = new Subject<any>();

  filteredOptions: IMultiSelectOption[] = [];
  renderFilteredOptions: IMultiSelectOption[] = [];
  model: any[] = [];
  parents: any[];
  title: string[];
  differ: any;
  numSelected: number = 0;
  set isVisible(val: boolean) {
    this._isVisible = val;
    this._workerDocClicked = val ? false : this._workerDocClicked;
  }
  get isVisible() {
    return this._isVisible;
  }
  renderItems = true;

  defaultSettings: IMultiSelectSettings = {
    closeOnClickOutside: true,
    pullRight: false,
    enableSearch: false,
    searchRenderLimit: 0,
    searchRenderAfter: 1,
    searchMaxLimit: 0,
    searchMaxRenderedItems: 0,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default btn-secondary',
    containerClasses: 'dropdown-inline',
    selectionLimit: 0,
    minSelectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: false,
    showUncheckAll: false,
    fixedTitle: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
    isLazyLoad: false,
    stopScrollPropagation: false,
    loadViewDistance: 1
  };
  defaultTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };

  get searchLimit() {
    return this.settings.searchRenderLimit;
  }

  get searchRenderAfter() {
    return this.settings.searchRenderAfter;
  }

  get searchLimitApplied() {
    return this.searchLimit > 0 && this.options.length > this.searchLimit;
  }

  private _isVisible = false;
  private _workerDocClicked = false;
  private _hideMe = true;
  constructor(private element: ElementRef,
    private fb: FormBuilder,
    private searchFilter: MultiSelectSearchFilter,
    differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
    this.settings = this.defaultSettings;
    this.texts = this.defaultTexts;
  }

  getItemStyle(option: IMultiSelectOption): any {
    if (!option.isLabel) {
      return { 'cursor': 'pointer' };
    }
  }

  getItemStyleSelectionDisabled(): any {
    if (this.disabledSelection) {
      return { 'cursor': 'default' };
    }
  }


  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
    this.texts = Object.assign(this.defaultTexts, this.texts);
    this.title = [this.texts.defaultTitle] || [''];

    this.filterControl.valueChanges
      .takeUntil(this.destroyed$)
      .subscribe(function () {
        this.updateRenderItems();
        if (this.settings.isLazyLoad) {
          this.load();
        }
      }.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.options = this.options || [];
      this.parents = this.options
        .filter(option => typeof option.parentId === 'number')
        .map(option => option.parentId);
      this.updateRenderItems();

      if (this.texts) {
        this.updateTitle();
      }
    }

    if (changes['texts'] && !changes['texts'].isFirstChange()) {
      this.updateTitle();
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  removeOption(text){
    this.options.filter((option: IMultiSelectOption) => text == option.name)
    .map((option: IMultiSelectOption) => {
      this.model = this.model.filter(function(optionObj) {
        return option.id != optionObj;
      });
    });
}
showRemoveButton(text){
let bool=false;
 this.options.filter((option: IMultiSelectOption) =>{
   bool = (text === option.name);
  }
  );
  return bool;
}

  updateRenderItems() {
    this.renderItems = !this.searchLimitApplied || this.filterControl.value.length >= this.searchRenderAfter;
    this.filteredOptions = this.searchFilter.transform(
      this.options,
      this.settings.isLazyLoad ? '' : this.filterControl.value,
      this.settings.searchMaxLimit,
      this.settings.searchMaxRenderedItems);
    this.renderFilteredOptions = this.renderItems ? this.filteredOptions : [];
  }

  onModelChange: Function = (_: any) => { };
  onModelTouched: Function = () => { };

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.model = Array.isArray(value) ? value : [value];
    } else {
      this.model = [];
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  ngDoCheck() {
    const changes = this.differ.diff(this.model);
    if (changes) {
      this.updateNumSelected();
      this.updateTitle();
    }
  }

  validate(_c: AbstractControl): { [key: string]: any; } {
    return (this.model && this.model.length) ? null : {
      required: {
        valid: false,
      },
    };
  }

  registerOnValidatorChange(_fn: () => void): void {
    throw new Error('Method not implemented.');
  }

  clearSearch(event: Event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    this.filterControl.setValue('');
  }
 
  toggleDropdown() {
    this.isVisible = !this.isVisible;
    this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
  }

  isSelected(option: IMultiSelectOption): boolean {
    return this.model && this.model.indexOf(option.id) > -1;
  }

  setSelected(_event: Event, option: IMultiSelectOption) {
    if (option.isLabel) {
      return;
    }
    if (!this.disabledSelection) {
      if (_event.stopPropagation) {
        _event.stopPropagation();
      }
      const index = this.model.indexOf(option.id);
      if (index > -1) {
        if ((this.settings.minSelectionLimit === undefined) || (this.numSelected > this.settings.minSelectionLimit)) {
          this.model.splice(index, 1);
          this.onRemoved.emit(option.id);
        } 
      } else {
        if (this.settings.selectionLimit === 0 || (this.settings.selectionLimit && this.model.length < this.settings.selectionLimit)) {
          this.model.push(option.id);
          this.onAdded.emit(option.id); 
        } 
      }
      if (this.settings.closeOnSelect) {
        this.toggleDropdown();
      }
      this.model = this.model.slice();
      this.onModelChange(this.model);
      this.onModelTouched();
    }
  }

  updateNumSelected() {
    this.numSelected = this.model.filter(id => this.parents.indexOf(id) < 0).length || 0;
  }

  updateTitle() {
    this.title=[];
    if (this.numSelected === 0 || this.settings.fixedTitle) {
      this.title = (this.texts) ? [this.texts.defaultTitle] : [''];
     } else if (this.settings.displayAllSelectedText && this.model.length === this.options.length) {
       this.title = (this.texts) ? [this.texts.allSelected ]: [''];
    } else if (this.settings.dynamicTitleMaxItems && this.settings.dynamicTitleMaxItems >= this.numSelected) {
     this.options.filter((option: IMultiSelectOption) => this.model.indexOf(option.id) > -1)
        .map((option: IMultiSelectOption) => this.title.push(option.name));
    } else { 
      this.title = [this.numSelected
        + ' '
        + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural)];
    }
  } 
  preventCheckboxCheck(event: Event, option: IMultiSelectOption) {
    if (this.settings.selectionLimit && !this.settings.autoUnselect &&
      this.model.length >= this.settings.selectionLimit &&
      this.model.indexOf(option.id) === -1 &&
      event.preventDefault
    ) {
      event.preventDefault();
    }
  }

  isCheckboxDisabled(): boolean {
    return this.disabledSelection;
  } 
  load() {
    this.onLazyLoad.emit({
      length: this.options.length,
      filter: this.filterControl.value
    });
  }

}
