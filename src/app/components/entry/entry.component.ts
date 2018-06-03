import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';

import { CptCode } from '../../models/CptCode';
import { Entry } from '../../models/Entry';
import { Icd10Code } from '../../models/Icd10Code';

@Component({
  templateUrl: './entry.component.html',
  styleUrls: [
	'../../../assets/styles/kendo.common.min.css',
	'../../../assets/styles/bootstrap.css',
	'../../../assets/styles/Site.css'
  ]
})
export class EntryComponent implements OnInit {
	public allCptCodes: Array<CptCode>;
	public cptCodeDescriptors: Array<string>;
	public entry: Entry;
	public filter:string;
    constructor(private dataService: DataService){}
    
    ngOnInit():void {
		this.entry = new Entry();
		this.entry.CptCodes.push(new CptCode());
		
	}
	
	doFilter():void {
		this.dataService.getCptCodes(this.filter).subscribe(cpts => {
			
		})
	}

	cptSelected(value:any, elem:CptCode): void {
		if(value) {
			let cptCode = this.allCptCodes.filter(e => e.ShortDescriptor == value)[0].CPTCode;
			this.dataService.getIcd10Codes(cptCode).subscribe(codes => {
				elem.AllIcd10Codes = codes;
			});
			elem.ICD10Codes.push(new Icd10Code());

			//make a new field
			this.entry.CptCodes.push(new CptCode());
		} else {
			//clearing out this code, so get rid of any Icd10's that it may have
			elem.ICD10Codes = new Array<Icd10Code>();
		}
	}
	icd10Selected(cpt:CptCode):void {
		cpt.ICD10Codes.push(new Icd10Code());
	}
}
