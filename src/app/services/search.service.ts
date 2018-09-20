import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { CptCode } from '../models/CptCode';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {

	private searches:Array<PriorCptSearches> = new Array<PriorCptSearches>();

	constructor(private dataService:DataService) {}

	searchCpt(searchTerm:string): Observable<Array<CptCode>> {
		searchTerm = searchTerm.toLowerCase();
		//find out if we did the search already
		const prior = this.searches.filter(s => searchTerm.indexOf(s.key) > -1);
		if(prior.length === 0) {
			//no, nothing like this - go to db
			let subject = new Subject<Array<CptCode>>();
			let search = this.dataService.searchCpt(searchTerm).subscribe(res => {
				this.searches.push(new PriorCptSearches(searchTerm, res));
				subject.next(res);
			});
			return subject;
		} else {
			//find best match - ie, longest search term 
			const bestMatch = prior.sort((a,b) => {
				if(a.key.length > b.key.length) return -1;
				if(a.key.length < b.key.length) return 1;
				return 0;
			})[0];
			const newResults = bestMatch.results.filter(r => r.FullDescriptor.toLowerCase().indexOf(searchTerm) > -1);
			this.searches.push(new PriorCptSearches(searchTerm, newResults));
			return Observable.of(newResults);
		}
		
	}
}

class PriorCptSearches {
	key:string;
	results: Array<CptCode>

	constructor(key, results) {
		Object.assign(this, {key: key, results: results});
	}
}