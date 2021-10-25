import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faIcon'
})
export class FaIconPipe implements PipeTransform {
  transform(name: string): string[] {
    return ['fas', name];
  }
}
