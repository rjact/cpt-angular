import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'highlight'})
export class HighlightTermPipe implements PipeTransform {
  transform(value: string, term: string, className:string = ''): string {
	let words = term.split(' ');
	words.forEach(w => {
		let regex = new RegExp(w, 'gi');
		value = value.replace(regex, (x) => `<span class="${className || 'highlight'}">${x}</span>`)
	})
    return value;
  }
}