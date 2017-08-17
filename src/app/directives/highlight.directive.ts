import { Directive, ElementRef,Input,OnChanges} from '@angular/core';

/**
 * 
 * 
 * @export
 * @class HighlightDirective
 * @implements {OnInit}
 * Directive to highlight an element
 */
@Directive({
  selector: '[myHighlight]'
})


export class HighlightDirective implements OnChanges{
  @Input('myHighlight') highlightColor: string;
  
  
  
  /**
   * Creates an instance of HighlightDirective.
   * @param {ElementRef} el 
   * @memberof HighlightDirective
   */
  constructor(private el: ElementRef) { 
   
  }


  /**
   * 
   * 
   * @memberof HighlightDirective
   * Sets the highlight color
   */
  ngOnChanges(){
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
  }
}