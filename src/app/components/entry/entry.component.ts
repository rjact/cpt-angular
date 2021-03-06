import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';

import { CptCode } from '../../models/CptCode';
import { Entry } from '../../models/Entry';
import { Icd10Code } from '../../models/Icd10Code';
import { SearchService } from '../../services/search.service';
import { HighlightTermPipe } from '../../pipes/highlight-term.pipe';
import { KeepHtmlPipe } from '../../pipes/keep-html.pipe';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './entry.component.html',
  styleUrls: [
	'../../../assets/styles/entry.css'
  ]
})
export class EntryComponent implements OnInit, OnDestroy {
	public entry: Entry;
	public newCode:string;
	private searchTerm:string;
	private searchResults:Array<CptCode>;
	private cptSearchResults: Array<CptCode>;
	private allCpts:Array<CptCode>;

	private activeCpt:CptCode;
	private showIcd10List:boolean = false;
	private showSequences:boolean = false;

	private searchSubscription:ISubscription;
	private getAllCptsSubscription:ISubscription;

	constructor(private dataService: DataService, private searchService:SearchService){}
    
    ngOnInit():void {
		this.entry = new Entry();
		this.showSequences = true;
		this.getAllCptsSubscription = this.dataService.getAllCpts().subscribe(res => {
			this.allCpts = res;
		})
	}

	ngOnDestroy():void {
		if(this.getAllCptsSubscription) { this.getAllCptsSubscription.unsubscribe(); }
		if(this.searchSubscription) { this.searchSubscription.unsubscribe(); }
	}
	
	addByCptCode(): void {
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
				this.newCode = '';
			});
		}
	}
	search():void {
		if(this.searchTerm.length < 3) {
			this.searchResults = null;
			return;
		}
		this.searchSubscription = this.searchService.searchCpt(this.searchTerm).subscribe(res => {
			this.searchResults = res;
		})
	}
	searchCpts():void {
		if(this.newCode.length < 2) { return; }
		if(this.allCpts) {
			this.cptSearchResults = this.allCpts.filter(c => c.CPTCode.startsWith(this.newCode))
		}
	}
	getIcd10s(cpt) {
		this.activeCpt = cpt;
		this.showIcd10List = true;
	}
	removeCpt(cpt:string) {
		this.entry.CptCodes = this.entry.CptCodes.filter(c => c.CPTCode != cpt);
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
		this.showSequences = false;
	}
	checkEnter(event, type) {
		if(event.keyCode == 13) {
			switch(type) {
				case 'code':
					this.addByCptCode();
					break;
				case 'search':
					this.search();
					break;
			}
			
		}
	}
	addCpt(cpt) {
		this.entry.CptCodes.push(new CptCode(cpt));
		let icdSubscription = this.dataService.getIcd10Codes(cpt.CPTCode).subscribe(icd => {
			this.entry.CptCodes.filter(o => o.CPTCode == cpt.CPTCode).forEach(o => o.AllIcd10Codes = icd)
			icdSubscription.unsubscribe();
		})
		this.searchResults = null;
		this.cptSearchResults = null;
		this.searchTerm = '';
		this.newCode = '';
		[].forEach.call(document.getElementsByClassName('action'), (e) => e.classList.remove('active'));
		this.closeModal(0);
	}
	viewSequences() {
		this.showSequences = true;
	}

	showForm(evt) {
		[].forEach.call(document.getElementsByClassName('action'), (e) => e.classList.remove('active'));
		evt.target.parentElement.classList.add('active');
	}
}
