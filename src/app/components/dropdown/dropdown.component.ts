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
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { MultiSelectSearchFilter } from './search-filter.pipe';
import { MultiSelectOption, MultiSelectTexts } from './types';


@Component({
  selector: 'multiselect-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [MultiSelectSearchFilter]
})
export class MultiselectDropdown implements OnInit, OnChanges, DoCheck, OnDestroy {

  filteredCount = { count: 0 };
  filterControl: '';
  @Input() options: Array<MultiSelectOption>;
  @Input() texts: MultiSelectTexts;
  @Input() disabled: boolean = false;
  @Input() disabledSelection: boolean = false;
  @Output() selectionLimitReached = new EventEmitter();
  @Output() dropdownClosed = new EventEmitter();
  @Output() dropdownOpened = new EventEmitter();
  @Output() onAdded = new EventEmitter();
  @Output() onRemoved = new EventEmitter();
  @Output() onLazyLoad = new EventEmitter();
  //@Output() onFilter: Observable<string> = this.filterControl.valueChanges;

  @HostListener('document: click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (!this.isVisible) return;
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
  model: any[] = [];
  parents: any[];
  title: string[];
  differ: any;
  numSelected: number = 0;

  set isVisible(val: boolean) {
    this._isVisible = val;
  }
  get isVisible() {
    return this._isVisible;
  }
  renderItems = true;

  defaultTexts: MultiSelectTexts = {
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    searchEmptyResult: 'Nothing found...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };

  private _isVisible = false;
  private _hideMe = true;
  constructor(private element: ElementRef,
    private searchFilter: MultiSelectSearchFilter,
    differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
    this.texts = this.defaultTexts;
  }
  ngOnInit() {
    this.texts = Object.assign(this.defaultTexts, this.texts);
    this.title = [this.texts.defaultTitle] || [''];
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.options = this.options || []; 
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
  removeOption(text) {
    this.options.filter((option: MultiSelectOption) => text == option.label)
      .map((option: MultiSelectOption) => {
        this.model = this.model.filter(function (optionObj) {
          return option.id != optionObj;
        });
      });
  }
  showRemoveButton(text) {
    return this.options.filter((option: MultiSelectOption) => {
      return option.label === text
    }).length > 0;
  }
  ngDoCheck() {
    const changes = this.differ.diff(this.model);
    if (changes) {
      this.updateNumSelected();
      this.updateTitle();
    }
  }
  clearSearch(event: Event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    this.filterControl = '';
  }
  toggleDropdown() {
    this.isVisible = !this.isVisible;
    this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
  }
  isSelected(option: MultiSelectOption): boolean {
    return this.model && this.model.indexOf(option.id) > -1;
  }
  setSelected(_event: Event, option: MultiSelectOption) {
     if (!this.disabledSelection) {
      if (_event.stopPropagation) {
        _event.stopPropagation();
      }
      const index = this.model.indexOf(option.id);
      if (index > -1) {
        this.model.splice(index, 1);
        this.onRemoved.emit(option.id);

      } else {
        this.model.push(option.id);
        this.onAdded.emit(option.id);

      }
      this.model = this.model.slice();
    }
  }
  updateNumSelected() {
    this.numSelected = this.model.length || 0;
  }
  updateTitle() {
    this.title = [];
    if (this.numSelected === 0) {
      this.title = (this.texts) ? [this.texts.defaultTitle] : [''];
    } else if (this.model.length === this.options.length) {
      this.title = (this.texts) ? [this.texts.allSelected] : [''];
    } else if (3 >= this.numSelected) {
      this.options.filter((option: MultiSelectOption) => this.model.indexOf(option.id) > -1)
        .map((option: MultiSelectOption) => this.title.push(option.label));
    } else {
      this.title = [this.numSelected
        + ' '
        + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural)];
    }
  }
  preventCheckboxCheck(event: Event, option: MultiSelectOption) {
    if (this.model.indexOf(option.id) === -1 &&
      event.preventDefault
    ) {
      event.preventDefault();
    }
  }
}
