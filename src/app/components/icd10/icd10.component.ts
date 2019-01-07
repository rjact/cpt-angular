import { Component, Input, OnInit, OnDestroy, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Icd10Code } from '../../models/Icd10Code';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    selector: 'icd10codes',
    templateUrl: './icd10.component.html',
	styleUrls: ['../../../assets/styles/icd10.css']
})
export class Icd10Component implements OnInit, OnDestroy, OnChanges {
	@Input() private icd10codes:Array<Icd10Code>;
	public filteredIcd10Codes: Array<Icd10Code>;
	public codeFilter:string = "";
	public descripFilter:string = "";

	private getIcd10Subscription:ISubscription;
	public loading:boolean = true;
	@Output() onAddIcd10:EventEmitter<Icd10Code> = new EventEmitter<Icd10Code>();
	@Output() onClose:EventEmitter<number> = new EventEmitter<number>();

	constructor(private dataService:DataService) {
	}

	addIcd10(icd10) {
		if(!icd10.isIncluded) {
			icd10.isIncluded = true;
			this.onAddIcd10.next(icd10);
		}
	}
	close() {
		this.onClose.next(0);
	}
	
	filter() {
		if(this.codeFilter === "" && this.descripFilter === "") {
			this.filteredIcd10Codes = this.icd10codes;
		} else {
			if(this.codeFilter == "") {
				this.filteredIcd10Codes = this.icd10codes.filter(i => {
					const words = this.descripFilter.toLowerCase().split(' ');
					const descrip = i.ICD_10CMFullDescription.toLowerCase();
					return words.every(w => descrip.indexOf(w) > -1);
				}) ;
			} else {
				if(this.descripFilter == "") {
					this.filteredIcd10Codes = this.icd10codes.filter(i => {
						return i.ICD_10CMCode.toLowerCase().indexOf(this.codeFilter.toLowerCase()) > -1
					});
				} else {
					this.filteredIcd10Codes = this.icd10codes.filter(i => {
						return i.ICD_10CMCode.toLowerCase().indexOf(this.codeFilter.toLowerCase()) > -1 
							&& i.ICD_10CMFullDescription.toLowerCase().indexOf(this.descripFilter.toLowerCase()) > -1
					});
				}
			}
			/*
			this.filteredIcd10Codes = this.icd10codes.filter(i => {
				return (this.codeFilter == "" || i.ICD_10CMCode.toLowerCase().indexOf(this.codeFilter.toLowerCase()) > -1) 
					&& (this.descripFilter == "" || i.ICD_10CMFullDescription.toLowerCase().indexOf(this.descripFilter.toLowerCase()) > -1)
			});
			*/
		}
	}
	ngOnInit() {
		/*
		if(!this.icd10codes)
			this.loading = true;
		*/
	}

	ngOnDestroy() {
		if(this.getIcd10Subscription) { this.getIcd10Subscription.unsubscribe(); }
	}
	ngOnChanges(changes:SimpleChanges) {
		if(changes.icd10codes && changes.icd10codes.currentValue) {
			this.icd10codes = changes.icd10codes.currentValue;
			this.filteredIcd10Codes = this.icd10codes;
			this.loading = false;
		}
	}

}
