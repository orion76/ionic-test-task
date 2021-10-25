import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isUndefined'
})
export class IsUndefinedPipe implements PipeTransform {
  transform(value: never, elseText: string): string {
    return value === undefined ? elseText : value;
  }
}
