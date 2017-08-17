import {Pipe, PipeTransform, Injectable} from "@angular/core";
import { MultiSelectOption } from './types';
 
/**
 * 
 * 
 * @export
 * @class MultiSelectSearchFilter
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'searchFilter',
  pure: true
})

@Injectable()
export class MultiSelectSearchFilter implements PipeTransform {
  transform(items: MultiSelectOption[],args?): any {
    var term = args[0];
    var counter = args[1];
    if (term === undefined) {
      if (counter) {
        counter.count = items.length;
      }
      return items
    };
    var result = items.filter(function(item) {
      for(let property in item){
        if (item[property] === null){
          if (counter) {
            counter.count = 0;
          }
          continue;
        }
        if(item[property].toString().toLowerCase().includes(term.toLowerCase())){
          args
          return true;
        }
      }
      return false;
    });
    if (counter) {
      counter.count = result.length;
    }
    return result;
  }
}