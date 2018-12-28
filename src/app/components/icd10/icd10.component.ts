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
	public allICD10s: Array<Icd10Code>;
	private getIcd10Subscription:ISubscription;
	private getAllIcd10Subscription:ISubscription;
	public loading:boolean = true;
	//@Input() cpt:string;
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
			this.loading = false;
		}
	}

}
