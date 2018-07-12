import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
	constructor(private http:Http) {}
	
    private API_ROOT = 'http://localhost:53614/Home/';
    
    private getHeaders():any {
        let headers = new Headers();  
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		return {headers: headers};
	}

	getCptCode(code:string) {
		return this.http.get(`${this.API_ROOT}getCptCode?code=${code}`)
			.map((resp:any) => resp.json());
	}
    getCptCodes(filter:string):any {
		return this.http.get(`${this.API_ROOT}getCptCodes?filter=${filter}`)
			.map((resp:any) => resp.json());
	}
    
    getIcd10Codes(cptCode: string):any {
		return this.http.get(`${this.API_ROOT}getIcd10Codes?cpt=${cptCode}`)
			.map((resp:any) => resp.json());
	}

	getSequences(parentId: number):any {
		return this.http.get(`${this.API_ROOT}getSequences?ParentId=${parentId}`)
			.map((resp:any) => resp.json());
	}
	getCptsForSequence(sequenceId: number):any {
		return this.http.get(`${this.API_ROOT}getCptsForSequence?SequenceId=${sequenceId}`)
			.map((resp:any) => resp.json());
	}
}
