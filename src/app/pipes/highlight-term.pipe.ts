import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'highlight'})
export class HighlightTermPipe implements PipeTransform {
  transform(value: string, term: string, className:string = ''): string {
    let regex = new RegExp(term, 'gi');
    return value.replace(regex, (x) => `<span class="${className || 'highlight'}">${x}</span>`);
  }
}