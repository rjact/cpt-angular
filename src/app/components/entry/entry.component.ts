import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';

import { CptCode } from '../../models/CptCode';
import { Entry } from '../../models/Entry';
import { Icd10Code } from '../../models/Icd10Code';

@Component({
  templateUrl: './entry.component.html',
  styleUrls: [
	'../../../assets/styles/entry.css'
  ]
})
export class EntryComponent implements OnInit {
	public entry: Entry;
	public newCode:string;
	constructor(private dataService: DataService){}
    
    ngOnInit():void {
		this.entry = new Entry();
	}
	
	add(): void {
		if(this.newCode) {
			this.dataService.getCptCode(this.newCode).subscribe(cpt => {
				if(cpt.length > 0) {
					this.entry.CptCodes.push(new CptCode(cpt[0]));
				}
			});
		}
	}
	removeIcd10(cpt:CptCode, code:string) {
		cpt.ICD10Codes = cpt.ICD10Codes.filter(i => i.ICD10CMCode != code);
	}
}
