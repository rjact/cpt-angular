import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CptCode } from '../models/CptCode';
import { Patient } from '../models/Patient';
import { Entry } from '../models/Entry';

@Injectable()
export class DataService {
	constructor(private http:Http) {}
	
	//private API_ROOT = 'https://sandiasoft-server.azurewebsites.net/Home/';
	//private API_ROOT = 'http://localhost:53614/Home/';
	private API_ROOT = '/Home/';
	    
    private getHeaders():any {
        let headers = new Headers();  
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		return {headers: headers};
	}

	login(username:string, password:string) {
		return this.http.post(`${this.API_ROOT}login`, {username: username, password: password}, this.getHeaders())
			.map((resp:any) => resp.json());
	}
	getAllCpts() {
		return this.http.get(`${this.API_ROOT}getAllCpts`)
			.map((resp:any) => resp.json());
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

	searchCpt(searchTerm:string):Observable<Array<CptCode>> {
		return this.http.get(`${this.API_ROOT}searchDescription?term=${searchTerm}`)
			.map((resp:any) => resp.json());
	}
	searchPatient(firstName:string, lastName:string, ehrNumber:string) {
		return this.http.get(`${this.API_ROOT}searchpatient?FirstName=${firstName}&LastName=${lastName}&EHRNumber=${ehrNumber}`)
			.map((resp:any) => resp.json());
	}
	getPatientProcedures(patientId: number) {
		return this.http.get(`${this.API_ROOT}getPatientProcedures?PatientId=${patientId}`)
			.map((resp:any) => resp.json());		
	}

	saveEntry(entry:Entry) {
		var headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		return this.http.post(`${this.API_ROOT}saveEntry`, {patient: entry.Patient, procedure: entry.Procedure}, this.getHeaders())
			.map((resp:any) => resp.json());
	}

	searchICD10s(term:string) {
		console.warn('Should cache this or get from service worker');
		return this.http.get(`${this.API_ROOT}searchICD10s?term=${term}`)
			.map((resp:any) => resp.json());				
	}
	validateIcd10(code:string) {
		return this.http.get(`${this.API_ROOT}validateIcd10?code=${code}`)
		.map((resp:any) => resp.json()); 
	}
}
