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
	private activeCpt:CptCode;
	private showIcd10List:boolean = false;
	constructor(private dataService: DataService){}
    
    ngOnInit():void {
		this.entry = new Entry();
	}
	
	add(): void {
		if(this.newCode) {
			this.dataService.getCptCode(this.newCode).subscribe(cpt => {
				if(cpt.length > 0) {
					let newCpt = new CptCode(cpt[0]);
					this.entry.CptCodes.push(new CptCode(cpt[0]));
					let icdSubscription = this.dataService.getIcd10Codes(cpt[0].CPTCode).subscribe(icd => {
						this.entry.CptCodes.filter(o => o.CPTCode == newCpt.CPTCode).forEach(o => o.AllIcd10Codes = icd)
						icdSubscription.unsubscribe();
					})
				}
			});
		}
	}
	getIcd10s(cpt) {
		this.activeCpt = cpt;
		this.showIcd10List = true;
	}
	addIcd10(icd10) {
		const currCpt = this.entry.CptCodes.filter(c => c.CPTCode == this.activeCpt.CPTCode);
		currCpt[0].ICD10Codes.push(icd10);
	}
	removeIcd10(cpt:CptCode, code:string) {
		cpt.ICD10Codes = cpt.ICD10Codes.filter(i => i.ICD_10CMCode != code);
	}
	closeModal(val:number) {
		this.showIcd10List = false;
	}
}
